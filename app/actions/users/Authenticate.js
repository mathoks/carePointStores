"use server";

import { signIn } from "@/auth";
import joi from "joi";
import { AuthError } from "next-auth";
import { headers } from "next/headers";
const FormSchema = joi.object({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
});

const State = {
  errors: {
    error: [],
    name: "",
    
  },
  message: "",
  success: null,
  redirect: null
};

/**
 * @typedef {Object} Invoice
 * @property {string} email - The user email.
 * @property {string} password - The user password.
 * @param {string} provider - The provider id.
 * @param {State} prevState - The previous application state (optional).
 * @param {FormData} formData - The form data containing invoice information.
 * @returns {Promise<object>} An object containing success/failure information and optional updated state.
 */
export const Authenticate = async function (State, formData) {
  let validatedFields = {};
      const headerList = await headers();
       const domain = headerList.get("host");
  // 2. Check provider ID and Authenticate (handle different providers)
  try {
    // 1. Validate Form Fields using FormSchema
    validatedFields = await FormSchema.validateAsync({
      email: formData.get("email"),
    });

    // Destructure validated data
    const { email } = validatedFields;
     await signIn("nodemailer", { email, redirectTo: "/settings/profile" });

  } catch (error) {
    if (error.message === "NEXT_REDIRECT") {
      throw error;
    }

    if (error?.details) {
      // Return user-friendly error messages
      validatedFields = {};
      return {
        errors: {
          error: error.details[0].message,
          name: error.details[0].context["label"],
        },
        message: "Validation failed. Please check your input.",
      };
    }
    if (error instanceof AuthError) {
      if (error.type === "CallbackRouteError" && !error?.cause) {
        return {
          errors: {
            error: ["please try again network could not be reached..."],
            name: "Authentication failed.",
          },
          message: "try again network could not be reached...",
          success: false,
        };
      }

      if (error.type === "CredentialsSignin" && !error?.cause) {
        return {
          errors: {
            error: ["Invalid credentials."],
            name: "credentials failed.",
          },
          message: "wrong credentials",
          success: false,
        };
      }
      
      return {
        errors: {
          error: [error?.cause?.err?.message],
          name: "credentials failed.",
        },
        message: error?.cause?.err?.message,
        success: false,
      };
    }

    throw error;
  }
};
