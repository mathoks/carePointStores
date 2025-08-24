"use server";

import { headers } from "next/headers";




/**
 * @typedef {Object} Invoice
 * @property {string} email - The user email.
 * @property {string} password - The user password.
 * @param {string} provider - The provider id.
 * @param {State} prevState - The previous application state (optional).
 * @param {FormData} formData - The form data containing invoice information.
 * @returns {Promise<object>} An object containing success/failure information and optional updated state.
 */
export const addLiked = async function (b) {
    console.log(b)
  const headerList = await headers();
  const domain = headerList.get("host");
  const session = await auth();
 
  // 2. Check provider ID and Authenticate (handle different providers)

  try {
    if (!session.user.id) {
      throw new Error("you are unauthorized please sign in");
    }
    
   
    const response = await fetch(
      `http://${domain}/api/Discover/post`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         storeId: session?.user.id,
         text,
         category,
         productId
        }),
      }
    );

    // if (!response.ok) {
    //   throw new Error("Network failed");
    // }

    // const store = await response.json();
  

    // if (!store) {
    //   throw new Error("could not create store");
    // }
   

    return {
      success: true,
      message: ` post Successfully added`,
      errors: {},
    };
  } catch (error) {
    if (error.message === "NEXT_REDIRECT") {
      throw error;
    }
    if (error?.details) {
    
      return {
        errors: {
          error: error.details[0].message,
          name: error.details[0].context["label"],
        },
        message: "Validation failed. Please check your input.",
        success: false,
      };
    } else {
      
      return {
        errors: {
          error: error.message,
          name: error.message.split(" ")[0],
        },
        message: `Validation failed. ${error.message}.`,
        success: false,
      };
    }
  }
};
