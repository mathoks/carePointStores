import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";




// Create a single instance of the Prisma client for efficiency
let prisma;
const neon = new Pool({
  connectionString: process.env.POSTGRES_PRISMA_URL,
});

const adapter = new PrismaNeon(neon);

/**
 * GET /api/store/
 * @route GET /api/store.
 * @returns {Promise<void>}
 */

export async function GET(req) {
  
    const storeId = (req.url).split('/')[5]

  if(!prisma){
    prisma = new PrismaClient({adapter})
  }

  try {
    const store = await prisma.store.findUnique({
      where: {
        id : storeId
      },
      
          select: {
            id: true,
            businessName: false,
            phone: false,
            shopAddress: false,
            state: false,
            country:false,
            market: false,
            about:false,
            bizLogo:false,
            email:false,
            createdAt:false,
            updatedAt: false
          },
        
    })
    
    if(store === null){
        return NextResponse.json({data: false})
    }
    
    return NextResponse.json({ data: true });
  } catch (error) {
    
   return Response.json({ message: "Internal server error"});
  }
}
