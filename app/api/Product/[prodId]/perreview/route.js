import { auth } from "@/auth";
import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import { unstable_cache } from "next/cache";
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

if (!prisma) {
  prisma = new PrismaClient({ adapter });
}

export async function GET(req) {
  const prodId = req.nextUrl.pathname.split("/")[3];
  const { searchParams } = new URL(req.url);
  
  try {
    const userProductReview = unstable_cache(
      async (prodId) => {
        const review = await prisma.prod_reviews.findUnique({
          where: { userReview: { 
            category_id: Number(searchParams.get('category')),
            user_id : searchParams.get('user'),
            prod_id: prodId,   
          }},
          
        });
        console.log(review)
        return review;
      },
      [`product + ${prodId} + review`],
      { revalidate: 60 * 5, tags: ["userreview"] }
    );
    const data = await userProductReview(prodId);
    if (data === null) {
      return NextResponse.json({ data: {} });
    }
   
    return NextResponse.json({ data: data });
  } catch (error) {
    return Response.error();
  }
}
