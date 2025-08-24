"use server";
import { QueryClient } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


const State = {
  success: null,
  errors: {
    email: [],
    password: [],
    username: [],
  },
  message: "",
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
export const getSearch = async function (State, formData) {
  const headerList = await headers();
  const domain = headerList.get("host");
  
  console.log(formData)
  // 1. Initialize validatedFields
  let validatedFields = {};
  // 2. Check provider ID and Authenticate (handle different providers)

//   try {
//     // 1. Validate Form Fields using FormSchema
//     validatedFields = await FormSchema.validateAsync({
//       email: formData.get("email"),
//     });

    // 2. Check if user already exists
    //   const { email } = validatedFields;
    try {
    //   const response = await fetch(`http://${domain}/api/auth/register`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email}),
    //   });
     const data =  Query.fetchInfiniteQuery(AllproductOptions({pageParam: undefined}))
     console.log(data);
      if (!response.ok) {
        throw new Error("Network failed");
      }
      // Destructure validated data
    //   redirect(`http://${domain}/login`)

     } catch (error) {
    console.log(error)
    if(error.message === "NEXT_REDIRECT"){
      throw error
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
        success: false,
      };
    } else{
  
      return {
        errors: {
          error: ["An error occurred. Please try again later."],
          name: "Authentication failed.",
        },
        success: false,
        message: "Oops.. Account creation failed.",
      };
    }
  }
  
};
