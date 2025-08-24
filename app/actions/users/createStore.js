"use server";
import { auth } from "@/auth";
import joi from "joi";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  isPossiblePhoneNumber,
} from "libphonenumber-js";
import {ImageResize} from "@/app/lib/utills/ImageResize";
import { revalidatePath } from "next/cache";


const FormSchema = joi.object({
  storename: joi
    .string()
    .pattern(new RegExp("[a-zA-Z0-9\s]+$")).min(6).max(20)
    .required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  //   phone: joi.string().pattern(new RegExp("[0-9]{11,15}")).required(),
  location: joi.string().required(),
  description: joi
    .string()
    .pattern(new RegExp("[a-zA-Z0-9s\u00A0.,:?]+$"))
    .min(6)
    .max(200)
    .required(),
  address: joi.string().pattern(new RegExp("[a-zA-Z0-9s\u00A0.,-]+$")).min(6).max(50).required(),
});

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
export const createStore = async function (State, formData) {
  const phone = formData.get("tel");
  const file = formData.get("picture");
  const headerList = headers();
  const domain = headerList.get("host");
  const session = await auth();
  
  // 1. Initialize validatedFields
  let validatedFields = {};
  let locations = {};
  // 2. Check provider ID and Authenticate (handle different providers)
  
  try {
    
    const url = (typeof file.name !== "undefined" && file.size !== 0 ) ? await ImageResize(file) : null
    
    if(url === ''){
        throw new Error("image upload failed")
    }
    if (!isPossiblePhoneNumber(phone))
      throw new Error("phone number not valid");
    // 1. Validate Form Fields using FormSchema
      validatedFields = await FormSchema.validateAsync({
      storename: formData.get("storename"),
      address: formData.get("address"),
      description: formData.get("description").trim(),
      location: formData.get("location"),
    });

      const { location } = validatedFields;
      
      const hasMatch = location.indexOf('state') !== -1 ||
                    location.indexOf('country') !== -1 ||
                    location.indexOf('market') !== -1;
      if (location !== "" && !hasMatch) {
        const Location = location.split(",");
        if (Array.isArray(Location) && Location.length === 3)
          locations = {
              country: Location[0].trim(),
              state: Location[1].trim(),
              market: Location[2].trim(),
            };
      } else throw new Error("Location is required");

    
        const { storename, address, description,  } = validatedFields;
        const response = await fetch(
          `http://${domain}/api/Dashboard/${session?.user.id}/createstore`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: session?.user.id,
              storename,
              address,
              description,
              phone,
              state: locations.state,
              country: locations.country,
              market: locations.market,
              image : url !== null ? url : null 
            }),
          }
        );
        
        if (!response.ok) {
          throw new Error("an error occured please try again");
        }
        
        const store = await response.json();
        const {id, businessName} = store.data;
       
        if (!store) {
          throw new Error('could not create store')
        } 
        
       
        redirect(`http://${domain}/store/${encodeURIComponent(businessName)}/${encodeURIComponent(id)}`);
        
        //   return {
        //     success: true,
        //     message: `${store.data.storename} store Successfully created `,
        //     errors: {},
        //     store: store.data.storename 
        //   };
        
    
  } catch (error) {
    if(error.message === 'NEXT_REDIRECT'){
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
    } else
      return {
        errors: {
          error: error.message,
          name:  error.message.split(' ')[0]
         
        },
        message: `Validation failed. ${error.message}.`,
        success: false,
      };
     
  }
  
};
