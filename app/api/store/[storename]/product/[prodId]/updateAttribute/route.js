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

export async function PATCH(req) {
  if (req.method === "PATCH") {
    try {
      const data = await req.json();
      const { id, ...rest } = data;
      const result = await prisma.$transaction(async (prima) => {
        const hasAttrib = await prima.ProductAttribute.findUnique({
          where: { id: id },
          select: { id: true }, // Only select necessary fields
        });

        if (hasAttrib !== null) {
          const updateAt = await prima.ProductAttribute.update({
            where: { id: hasAttrib.id },
            data: rest,
            select: { id: true },
          });

          return updateAt.id;
        } else if (hasAttrib === null) {
          const createAttr = await prima.ProductAttribute.create({
            data: {
              id: id,
              ...rest,
            },
            select: { id: true },
          });
          return createAttr.id;
        }
      });

      if (!result) throw new Error("operation was unsuccessfull");
      return NextResponse.json({ data: result });
    } catch (error) {
      console.log(error);
      return Response.json({ message: "Internal server error" });
    }
  }
}
