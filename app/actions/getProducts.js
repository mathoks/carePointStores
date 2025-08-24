"use server"
import { cookies, headers } from "next/headers";

export async function getStores() {
    const headerList = await headers();
    const domain = headerList.get("host");
    const abort = new AbortController()
    
    try {
      const response = await fetch(`http://${domain}/api/`, {signal: abort.signal, credentials: 'include', headers: {'Cookie': (await cookies()).toString() }},{ next: {tags:['store']}});
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const users = await response.json();
      
      return users || []; // Return an empty array if data is missing
    } catch (error) {
      return( {error:`${error.message}`});
    }
  }