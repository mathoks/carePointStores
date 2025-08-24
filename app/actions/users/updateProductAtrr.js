"use server";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { revalidateTag } from "next/cache";
import {
    validateProdAttri,
} from "@/app/lib/utills/actionValidator";
import { createFormbody } from "@/app/lib/utills/createFormBody";
import { nanoid } from "@reduxjs/toolkit";

/**
 * @typedef {Object} Invoice
 * @property {string} email - The user email.
 * @property {string} password - The user password.
 * @param {string} provider - The provider id.
 * @param {State} prevState - The previous application state (optional).
 * @param {FormData} formData - The form data containing invoice information.
 * @returns {Promise<object>} An object containing success/failure information and optional updated state.
 */
export const updateProductAtrr = async function ({}, formData) {
  const headerList = headers();
  const domain = headerList.get("host");
  const session = await auth();
  const id = formData.get("id");
  
  

  try {
    if (!session.user.id) {
      throw new Error("you are unauthorized please sign in");
    }
    const { brand, status, color, weight, size, material, warranty } =
      await validateProdAttri(formData);

    const fields = [
      { brand },
      { status },
      { color },
      { weight },
      { warranty },
      { material },
      { size },
      { id: id },
      
    ];

    const formBody = await createFormbody(fields);
   
    
    if(formBody === null){
        throw new Error("No data to update");
    }

    const response = await fetch(
      `http://${domain}/api/store/${session?.user.id}/product/${id}/updateAttribute`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...formBody,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network failed");
    }

    const productId = await response.json();

    if (!productId) {
      throw new Error("could not update product");
    }
    revalidateTag(productId.data);
   
    return {
      success: true,
      message: ` product Attribute Successfully updated`,
      errors: {},
      idOp: nanoid(5),
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
        idOp: nanoid(5),
      };
    } else {
      return {
        errors: {
          error: error.message,
          name: error.message.split(" ")[0],
        },
        message: `Validation failed. ${error.message}.`,
        success: false,
        idOp: nanoid(5),
      };
    }
  }
};
