import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/nodemailer";
import { authConfig } from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/model/db";
import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import { sendVerificationRequest } from "./app/actions/Mail/sendVerificationRequest";
import jsonwebtoken from "jsonwebtoken";
import { getQueryClient } from "./app/lib/queryClient/getQueryClient";
import { MergeCart } from "./app/lib/queryClient/getCartQuery";


const providers = [
  Google({
    authorization: {
      params: {
        prompt: "consent",
        access_type: "offline",
        response_type: "code",
      },
    },

    allowDangerousEmailAccountLinking: true,
  }),
  EmailProvider({
    server: process.env.EMAIL_SERVER,
    from: process.env.EMAIL_FROM,
    sendVerificationRequest: async ({ identifier, url, provider }) => {
      // Send a verification email to the user's email address
      return sendVerificationRequest({
        identifier,
        url,
        provider,
      });
    },
  }),
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

export const { auth, handlers, signIn, signOut } = NextAuth(async (req) => {
  const headerList = await headers();
  const cookie = await cookies()
  const domain = headerList.get("host");
  const queryClient = getQueryClient()
  return {
    ...authConfig,
    secret: process.env.AUTH_SECRET,
    trustHost: true,
    adapter: PrismaAdapter(prisma),
    providers,
    session: {
      strategy: "jwt",
    },
    jwt: {
      secret: process.env.AUTH_SECRET,
      encryption: true,
    },
    callbacks: {
      async signIn({ user, account, email }) {
        if (account?.provider === "google") {
          return true;
        }

        const userExists = await prisma.user.findUnique({
          where: {
            email: user.email,
          }, //the user object has an email property, which contains the email the user entered.
        });
        if (userExists && account?.provider === "nodemailer") {
          return true; //if the email exists in the User collection, email them a magic login link
        } else {
          redirect(`http://${domain}/register`);
        }
      },

      async redirect({ url, baseUrl }) {
        const URLObject = new URL(url);
        // Ensure auth is called to get the user
        // Aullows callback URLs on the same origin
        if (URLObject.origin === baseUrl) {
          if (
            URLObject.searchParams.get("return_url") ===
            "checkout/complete-order"
          ) {
            return `${baseUrl}/home/cart/${(await auth())?.user?.id ?? 'guest'}/complete-order`;
          } else if (url === "http://localhost:3001/login") {
            return `${baseUrl}/settings/profile`;
          } else {
            return  url;
          }
        }
        return baseUrl;
      },

      async jwt({ token, account, user }) {
        if (account) {
          // First-time login
          return {
            ...token,
            access_token: `google ${account.access_token}`,
            expires_at: account.expires_at,
            refresh_token: account.refresh_token,
            id_token: account.id_token,
          };
        } else if (
          Date.now() < token.expires_at * 1000 &&
          token.access_token.includes("google")
        ) {
          // Subsequent logins, access_token still valid
          return token;
        } else if (token.access_token.includes("google")) {
          console.log("google");
          // Subsequent logins, access_token expired, try to refresh
          if (!token.refresh_token) {
            throw new TypeError("Missing refresh_token");
          }

          try {
            const response = await fetch(
              "https://oauth2.googleapis.com/token",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded", // Important!
                },
                body: new URLSearchParams({
                  client_id: process.env.AUTH_GOOGLE_ID,
                  client_secret: process.env.AUTH_GOOGLE_SECRET,
                  grant_type: "refresh_token",
                  refresh_token: token.refresh_token,
                }),
              }
            );

            const tokensOrError = await response.json();

            if (!response.ok) {
              // Improved error handling:
              const errorDetails =
                typeof tokensOrError === "object" &&
                tokensOrError !== null &&
                tokensOrError.error_description
                  ? tokensOrError.error_description
                  : JSON.stringify(tokensOrError);
              throw new Error(
                `Token refresh failed: ${response.status} - ${errorDetails}`
              );
            }

            const newTokens = tokensOrError; // No need for type assertion if the structure is correct

            return {
              ...token,
              access_token: `google ${newTokens.access_token}`,
              expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
              refresh_token: newTokens.refresh_token || token.refresh_token, // Preserve refresh token if not provided
            };
          } catch (error) {
            console.error("Error refreshing access_token", error);
            token.error = "RefreshTokenError"; // Set error on token for client-side handling
            return token;
          }
        } else {
          const accessToken = jsonwebtoken.sign(
            {
              audience: `${process.env.AUTH_GOOGLE_ID}.apps.googleusercontent.com`,
              scope: "user profile",
              user_id: user.id,
              expires_in: "30d",
            },
            process.env.AUTH_SECRET,
            { expiresIn: token.exp } // Adjust expiration time as needed
          );
          return { ...token, access_token: `nodemailer ${accessToken}` };
        }
      },
      async session({ token, session }) {
        session.user.id = token.sub;
        session.access_token = token.access_token;
        return session;
      },
    },
    events: {
      async signOut() {
        console.log('logged out')
        queryClient.resetQueries({ queryKey: ['cart'], exact: true })
        queryClient.setQueryData(['cart'], [])
      },
      async signIn({user}) {
        let cart_items = []
        const {id} = user 
        cart_items =!!cookie.has('cart') && !!cookie.get('cart')?.value && [...JSON.parse(cookie.get('cart')?.value)]
        try {
           if(id && !!cart_items.length ) {
          await queryClient.fetchQuery(MergeCart(id, cart_items))
      } else {}
        } catch (error) {
          console.log(error)
        }
      finally {
        queryClient.invalidateQueries({queryKey: ['cart']})
        cookie.delete('cart', {path: '/api/auth/'})
        cart_items = [];
      }
    },
  }}
});
