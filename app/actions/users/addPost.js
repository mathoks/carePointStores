"use server";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { validatePost } from "@/app/lib/utills/actionValidator";



/**
 * @typedef {Object} Invoice
 * @property {string} email - The user email.
 * @property {string} password - The user password.
 * @param {string} provider - The provider id.
 * @param {State} prevState - The previous application state (optional).
 * @param {FormData} formData - The form data containing invoice information.
 * @returns {Promise<object>} An object containing success/failure information and optional updated state.
 */
export const addPost = async function (formData) {
  const headerList = headers();
  const domain = headerList.get("host");
  const session = await auth();
 
  // 2. Check provider ID and Authenticate (handle different providers)

  try {
    if (!session.user.id) {
      throw new Error("you are unauthorized please sign in");
    }
    
    const {
      text,
      category,
      productId
    } = await validatePost(formData);

   
   
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

    if (!response.ok) {
      throw new Error("Network failed");
    }

    const store = await response.json();
  

    if (!store) {
      throw new Error("could not create store");
    }
   
    

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
        message: `${error.message}.`,
        success: false,
      };
    }
  }
};
