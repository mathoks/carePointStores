import { api } from "@/app/utills/api";
import { auth } from "@/auth";
import jsonwebtoken from "jsonwebtoken";
import { intersectionBy } from "lodash";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    const cookie = await cookies();
    
    const accessToken = cookie.get("authjs.session-token");
    const refreshToken = cookie.get("authjs.refresh-token");
  try { 
     console.log(cookie.get("authjs.session-token"))
    // if (!accessToken) {
    //     console.log("no authjs session token")
    //     return NextResponse.json(null);
    // }
    const session = jsonwebtoken.verify(
      accessToken?.value,
      process.env.AUTH_SECRET
    );
   console.log(session, 'hrrrr');
    
    const hasCookie = cookie.has("authjs.refresh-token");
    if (!hasCookie) {
        console.log("No refresh token")
        const {exp, ...rest} = session;
        const refreshToken = jsonwebtoken.sign(rest, process.env.AUTH_SECRET, {
        algorithm: "HS256",
        expiresIn: "30d",
      });
      cookie.set("authjs.refresh-token", refreshToken, {
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        sameSite: "lax",
        httpOnly: true,
      });
    }
    return NextResponse.json(session, {status: 200});
  } catch (error) {
    if (error instanceof jsonwebtoken.TokenExpiredError) {
        console.log("Token expired")
        console.log(NextResponse.next().cookies)
       const data = await fetch("http://localhost:3001/api/auth/refresh", {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken?.value}`,
          'Access-Control-Allow-Origin': ['http://localhost:3000', 'http://localhost:3001'],
        },
       });
       if(data.ok){ 
        const user = await data.json()
        console.log(user);
       return NextResponse.json(user, {status: 200})
       }
    }
    
    // else if (error instanceof jsonwebtoken.JsonWebTokenError ) {
    //     console.log("Token expiredss")
    //     return NextResponse.json( { error :"Token expired"} , { status: 401 });
    // }
   else return NextResponse.json(null);
  }
}
