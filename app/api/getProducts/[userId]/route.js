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
    const storeId = (req.nextUrl.pathname).split('/')[3]
  try {
    
    const getProduct = unstable_cache(
      async (storeId) => {
      
        const products = await prisma.store.findUnique({
          where: {
            id: storeId,
          },
          select: {
            id: false,
            businessName: false,
            phone: false,
            shopAddress: false,
            email: false,
            state: false,
            bizLogo: false,
            about: false,
            createdAt: false,
            updatedAt: false,
            branches: false,
            storeOwner: false,
            storeReviews: false,
            storeSubscriptions: false,
              product: {
                select: {
                  id: true,
                  name: true,
                },
            },
          },
        });
        
       
        return products;
      },
      ["productList"],
      { tags: ["productList"], revalidate: 60 * 60 * 1 }
    );

    const cachedProducts = await getProduct(storeId);
    
    return NextResponse.json(cachedProducts);
  } catch (error) {
    return Response.json({ message: "Internal server error" });
  }
}
