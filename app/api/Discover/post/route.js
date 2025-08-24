import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import { revalidateTag } from "next/cache";
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

export async function POST(req) {
   
  if (req.method === "POST") {
    try {
        
      const data = await req.json();
      const { text, category, productId, storeId } = data;
      const result = await prisma.$transaction(async (prima) => {
        const newPost = await prima.post.create({
          data: {
            userId: storeId,
            text,
          },
          select: { id: true }, // Only select necessary fields
        });

        if (Array.isArray(category) && category.length > 0) {
          for (const item of category) {
            const fetchCategory = await prima.category.findUnique({
              where: { id: item },
              select: { id: true },
            });
            if (fetchCategory === null) throw new Error("not in the list");

            await prima.PostCategory.create({
              data: {
                categoryId: fetchCategory.id,
                postId: newPost.id,
              },
            });
          }
        } else throw new Error("operation must be an array");

        if (Array.isArray(productId) && productId.length > 0) {
          for (const item of productId) {
            await prima.PostProduct.create({
              data: {
                postId: newPost.id,
                productId: item,
              },
            });
          }
        }
        return true;
      });

      if (!result) throw new Error("operation was unsuccessfull");
      revalidateTag('post')
      return NextResponse.json({ data: result });
    
    } catch (error) {
      return NextResponse.error()
      // Response.json({ message: "Internal server error" });
    }
  }
}
