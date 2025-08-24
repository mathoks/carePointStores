"use server";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import { createObjectURL, } from "@/app/lib/utills/ImageResize";
import {
  validateProdEdit,
} from "@/app/lib/utills/actionValidator";
import { createFormbody } from "@/app/lib/utills/createFormBody";
import { createLink } from "@/app/lib/utills/generateLink";
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
export const updateProduct = async function ({}, formData) {
  const headerList = headers();
  const domain = headerList.get("host");
  const session = await auth();
  const file = formData.get("edit-0");
  const file2 = formData.get("edit-1");
  const id = formData.get("id");
  const prodid1 = formData.get("prodId-0");
  const prodid2 = formData.get("prodId-1");
  const url1 = formData.get("imgUrl-0");
  const url22 = formData.get("imgUrl-1");

  try {
    if (!session.user.id) {
      throw new Error("you are unauthorized please sign in");
    }
    const { name, description, negotiable, category, availability, price } =
      await validateProdEdit(formData);

    const files = [
        { img: file, ids: prodid1, url: url1 },
        { img: file2, ids: prodid2, url: url22 },
      ];
    const processedUrls = await createObjectURL(files);
    
    const fields = [
      { name },
      { description },
      { negotiable },
      { category },
      { price },
      { availability },
      { url: processedUrls.length === 0 ? null : processedUrls },
      { id: id },
      { link: createLink(formData) },
    ];

    const formBody = await createFormbody(fields);
    
    if(formBody === null){
        throw new Error("No data to update");
    }

    const response = await fetch(
      `http://${domain}/api/store/${session?.user.id}/product/${id}/update`,
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
     revalidateTag('store')
     revalidateTag(productId.data);
    

    return {
      success: true,
      message: ` product Successfully updated`,
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
