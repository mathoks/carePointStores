
import { NextResponse } from "next/server";


export async function GET() {

  try {
   
    return NextResponse.json(cachedStores);
  } catch (error) {
    
    // Log the error for debugging
    return NextResponse.error()
  }
}

// Call this function before your API route handlers are executed
