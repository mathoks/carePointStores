import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import {  unstable_cache } from "next/cache";
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
  const prodId = req.nextUrl.pathname.split("/")[5];

  try {
    const getProductById = unstable_cache(
      async (id) => {
        const product = await prisma.product.findUnique({
          where: {
            id: id,
          },
          include: {
            prodImage: {
              select: {
                id: true,
                image: true,
              },
            },
            store: {
              select: {
                businessName: true,
                bizLogo: true,
                phone: true,
                state: true,
                country: true,
                market: true,
              },
            },
            attribute: {
              select: {
              color: true,
              size: true,
              warranty: true,
              material: true,
              weight: true,
              brand: true,
              status: true,
              }
            },
            branch: {
              select: {
                id: true,
                branch: {
                  select: {
                    branchName: true,
                    branchAddress: true,
                    state: true,
                    country: true,
                    market: true,
                  },
                },
              },
            },
            category:{
            select:{  id: true,
              name: true,
              products: {
                include: { 
                  prodImage : true
                }
              }
            }},
            prod_reviews: {
              take: 5,
              orderBy: {
                createdat: 'desc' // Sort by createdAt in descending order
              },
              select: {
                id: true,
                createdat: true,
                comment: true,
                review: true,
                user: {
                  select: {
                    name: true,
                    image: true,
                  },
                },
              },
            },
          },
        });

        return product;
      },
      ["product", prodId],
      { revalidate: 60 * 5, tags: [prodId] }
    );
    const cachedProduct = await getProductById(prodId);
    
    return NextResponse.json({ data: cachedProduct });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal server error" });
  }
}
