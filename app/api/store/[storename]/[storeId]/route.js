import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
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
    const storeId = (req.url).split('/')[6]
    console.log(storeId, req.url)
  if(!prisma){
    prisma = new PrismaClient({adapter})
  }

  try {
    const store = await prisma.store.findUnique({
      where: {
        id : storeId
      },
      include: {
        product: {
          select: {
            id: true,
            storeId: true,
            category: true,
            price:true,
            name: true,
            description: true,
            prodImage: true,
            availability:true,
            prod_reviews: true
          },
        },
        branches: {
        select:  {
          id: true,
          branchName: true,
          branchAddress: true,
          state: true,
          country: true,
          market: true,
          phone:true
        }
      },
        storeReviews: {
          select: {
            id: true,
            comment: true,
            review: true
          }
        }
      },
    })
    
    if(store === null){
        return NextResponse.json({data: null})
    }
    console.log(store)
    return NextResponse.json({ data: store });
  } catch (error) {  
    console.log(error)
   return Response.json({error: 'bad'});
  }
}
