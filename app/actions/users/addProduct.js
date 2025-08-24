"use server";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import { ImageResize2 } from "@/app/lib/utills/ImageResize";
import { validateProduct } from "@/app/lib/utills/actionValidator";



/**
 * @typedef {Object} Invoice
 * @property {string} email - The user email.
 * @property {string} password - The user password.
 * @param {string} provider - The provider id.
 * @param {State} prevState - The previous application state (optional).
 * @param {FormData} formData - The form data containing invoice information.
 * @returns {Promise<object>} An object containing success/failure information and optional updated state.
 */
export const addProduct = async function ({}, formData) {
  const headerList = headers();
  const domain = headerList.get("host");
  const session = await auth();
  const file = formData.get("img1");
  const file2 = formData.get("img2");
  // 2. Check provider ID and Authenticate (handle different providers)

  try {
    if (!session.user.id) {
      throw new Error("you are unauthorized please sign in");
    }
    const {
      name,
      description,
      negotiable,
      categoryId,
      availability,
      link,
      price,
    } = await validateProduct(formData);

    if (file.size === 0 && file2.size === 0) {
      throw new Error("An image is required");
    }
    
    const url = await ImageResize2([file, file2]);
    if (url.length < 2) {
      throw new Error("image upload failed");
    }
    const response = await fetch(
      `http://${domain}/api/Dashboard/${session?.user.id}/addproduct`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          storeId: session.user.id,
          name,
          categoryId,
          price,
          availability,
          negotiable,
          link,
          description,
          prodImage: url,
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
    
    // redirect(`http://${domain}/store/${encodeURIComponent(businessName)}/${encodeURIComponent(id)}`);

    return {
      success: true,
      message: ` product Successfully added`,
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
