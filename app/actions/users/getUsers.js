"use server";
import { headers } from "next/headers";

/**
 * Get all users from the database
 * @returns {Array<User>} - array of user Objects
 */

export async function getUsers() {
  const headerList = headers();
  const domain = headerList.get("host");
  
  try {
    const response = await fetch(`http://${domain}/api/home`, { next: {tags:['store']}});
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const users = await response.json();
    return users.data || []; // Return an empty array if data is missing
  } catch (error) {
    return( {error:`${error.message}`});
  }
}
