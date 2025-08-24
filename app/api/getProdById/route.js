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

if(!prisma){
    prisma = new PrismaClient({adapter})
  }
  
export async function GET(req) {
    const prodId = (req.nextUrl.pathname).split('/')[5]
    
 

  try {
    const product = await prisma.product.findUnique({
      where: {
        id : prodId
      },
      include: {
        prodImage: {
          select: {
            id:true,
            image: true
          },
        },
        branch: {
        include:  {
            branch: {
                select:{
                branchName: true,
                branchAddress: true,
                state: true,
                country: true,
                market: true
          }}
        }
      },
        prod_reviews: {
          select: {
            id: true,
            comment: true,
            review: true,
            user: {
                select: {
                    name: true,
                    image:true
                }
            }
          }
        }
      },
    })
    
    if(product === null){
        return NextResponse.json({data: null})
    }
    
    return NextResponse.json({ data: product });
  } catch (error) {

   return Response.json({ message: "Internal server error"});
  }
}
