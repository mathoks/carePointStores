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

export async function GET(req) {
    const id = req.url.split('/')[5]
  if (!prisma) {
    prisma = new PrismaClient({ adapter });
  }

  try {
    const stores = await prisma.store.findUnique({
      where: { id},
      select: {
        id: false,
        businessName: false,
        phone: false,
        shopAddress: false,
        email: false,
        state: false,
        country: false,
        market: false,
        about: false,
        bizLogo: false,
        createdAt: false,
        updatedAt: false,
    //   include: {
        branches: {
        select: {
          id: true,
          branchName: true,
      },
        }}
    });

    
    if (Array.isArray(stores?.branches)) {
      return NextResponse.json({ data: stores?.branches });
    } else throw new Error("cant query database");
  } catch (error) {
    return Response.error();
  }
}
