
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
export async function GET(req) {
  try {
    const getCategory = unstable_cache(
      async () => {
        const category = await prisma.category.findMany({
            select: {
                id: true,
                name: true
            }
        })

        if (Array.isArray(category)) {
          return  category;
        } else {
          throw new Error("Couldn't query database");
        }
      },
      ["category"],
      { tags:['category'], revalidate: false} // Cache for 1 hour (adjust as needed)
    );

    const cachedStores = await getCategory();
    
    return NextResponse.json(cachedStores);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, {
      status: 500,
    });
  }
}

// Call this function before your API route handlers are executed
