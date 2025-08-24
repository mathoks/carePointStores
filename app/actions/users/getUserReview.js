"use server"

import { headers } from "next/headers";


export default async function getUserReview(prod, category_id, user_id) {
  
  const headerList = headers();
  const domain = headerList.get("host");
    const url = new URL(`http://${domain}/api/Product/${prod}/perreview`)
    url.searchParams.set("category", user_id)
     url.searchParams.set("user", category_id)
   
    try {
       
        const response = await fetch(url.href)
        
        if (!response.ok) {
            throw new Error(`API request failed with status ${Response.status}`)
        }
       
        const reviewSing = await response.json();
        
        return reviewSing
    } catch (error) {
       return {error : "failed"}
    }
}