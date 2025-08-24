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

if (!prisma) {
  prisma = new PrismaClient({ adapter });
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  try {
    const lim = searchParams.get("limit");
    const category = searchParams.get("category");
    const myCursor = searchParams.get("cursor") || 0;
   
    if (myCursor === 0) {
      const product = await prisma.Category.findMany({
        take: Number(lim),
        where: {
          name: category,
        },
        orderBy: {
          id: "asc",
        },
        select: {
          id: false,
          name: false,
          posts: {
            select: {
              id: false,
              category: false,
              categoryId: false,
              post: {
                select: {
                  id: true,
                  text: true,
                  author: {
                    select: {
                      password: false,
                      id: true,
                      name: true,
                      email: false,
                      image: false,
                      createdAt: false,
                      updatedAt: false,
                    },
                  },
                  products:{
                    select: {
                        productId: true,
                        product: {
                            select: {
                                name: true
                            }
                        }
                    }
                  }
                },
              },
            },
          },
        },
      });
      if (product?.length === 0) {
        return NextResponse.json({data: null, nextCursor: myCursor});
      }
      
      return NextResponse.json({
        data: product[0].posts.flatMap((m) => m.post),
        nextCursor:
          product[product.length - 1].posts[
            product[product.length - 1].posts.length - 1
          ].post.id,
      });
    } else {
      const product = await prisma.Category.findMany({
        take: Number(lim),
        skip: 1,
        cursor: {
          id: myCursor,
        },
        where: {
          name: category,
        },
        orderBy: {
          id: "asc",
        },
        select: {
          id: false,
          name: false,
          posts: {
            select: {
              id: true,
              category: false,
              categoryId: false,
              post: {
                select: {
                  id: true,
                  text: true,
                  author: {
                    select: {
                      password: false,
                      id: true,
                      name: true,
                      email: false,
                      image: false,
                      createdAt: false,
                      updatedAt: false,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (product?.length === 0) {
        return NextResponse.json({data: null, nextCursor: myCursor});
      }
     
      return NextResponse.json({
       data: product[0].posts.flatMap((m) => m),
        nextCursor:
          product[product.length - 1].posts[
            product[product.length - 1].posts.length - 1
          ].post.id,
      });
    }
  } catch (error) {
   
    return Response.json({ message: "Internal server error" });
  }
}
