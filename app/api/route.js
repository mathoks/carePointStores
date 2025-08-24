import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";

/**
 * GET /api/users
 * @route GET /api/users.
 * @returns {Promise<void>}
 */

export async function GET(Req) {
  const headerList = await headers()
  
  try {
    const response = await fetch('http://localhost:3000/api/v1/users/profile/', { headers: { 'Authorization' :  (await cookies()).get('refresh_token').value.toString()}});
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const todo = await response.json();
    console.log(todo)
    return Response.json({ data: todo });
  } catch (error) {
    console.error("Error fetching todo:", error);
    Response.error({ error: "Internal server error" });
  }
}
