import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import { unstable_cache } from "next/cache";
import { NextResponse } from "next/server";

let prisma;
const neon = new Pool({
  connectionString: process.env.POSTGRES_PRISMA_URL,
});

const adapter = new PrismaNeon(neon);

if (!prisma) {
  prisma = new PrismaClient({ adapter });
}
export async function GET() {
  try {
    const getPost = unstable_cache(
      async () => {
        const post = await prisma.post.findMany({
          include: {
            author: {
                select: {
                    store: {
                        select: {
                            id: true,
                            businessName: true
                        }
                    }
                }
            },
            products: {
              select: {
                productId: true,
                product: {
                    select: {
                        storeId: true,
                        category: true,
                        name: true,
                    }
                }
               
              },
            },
            categorys: {
                select: {
                    category: {
                        select: {
                            name: true
                        }
                    }
                }
            }
          },
        });

        if (Array.isArray(post)) {
          return  post;
        } else {
          throw new Error("Couldn't query database");
        }
      },
      ["post"],
      { tags:['post'], revalidate: 60 * 60 * 1} // Cache for 1 hour (adjust as needed)
    );

    const cachedStores = await getPost();
   
    return NextResponse.json(cachedStores);
  } catch (error) {
    return NextResponse.error()
  }
}

// Call this function before your API route handlers are executed
