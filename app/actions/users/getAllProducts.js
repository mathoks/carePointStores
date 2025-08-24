"use server"
import { headers } from "next/headers";

export async function getAllProducts() {
    const headerList = await headers();
    const domain = headerList.get("host");
    const abort = new AbortController()
    const base_api = process.env.API_URL

    try {
      const response = await fetch(`${base_api}/products?take=${10}&skip=${0}`, {signal: abort.signal},{ next: {tags:['store']}});
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const users = await response.json();
      
      return users || []; // Return an empty array if data is missing
    } catch (error) {
        console.log(error)
      return( {error:`${error.message}`});
    }
  }