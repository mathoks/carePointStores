"use server"

import { headers } from "next/headers";


export default async function getProductById(userInfo, productId) {
    const headerList = headers();
    const domain = headerList.get("host");
    try {
        const response = await fetch(`http://${domain}/api/store/${userInfo}/product/${productId}`, {next: {tags:['product', productId]}})
        if (!response.ok) {
            throw new Error(`API request failed with status ${Response.status}`)
        }
        const user = await response.json()
        
        return user.data || {}
    } catch (error) {
        return {error: error.message}
    }
}