"use server";

import { headers } from "next/headers";

/**
 * Get all users from the database
 * @returns {Array<User>} - array of user Objects
 */

export async function getStoreStatus(id) {
  const headerList = headers();
  const domain = headerList.get("host");
  
  try {
    const response = await fetch(`http://${domain}/api/hasStore/${id}`);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const status =  await response.json()
    return status; 
  } catch (error) {
    return error.message;
  }
}
