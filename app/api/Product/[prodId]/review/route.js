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

  try {
    const ProductReview = unstable_cache(
      async (prodId) => {
        const review_sum = await prisma.ratings_stats.findUnique({
          where: {
            prod_id: prodId,
          },
        });

        return review_sum;
      },
      [`reviews + ${prodId}`],
      { revalidate: 60 * 5, tags: ['reviewstats'] }
    );
    const data = await ProductReview(prodId);
    if (data === null) {
      return NextResponse.json({ data: null });
    }

    return NextResponse.json({ data: data});
  } catch (error) {
    console.log(error)
    return Response.error();
  }
}
