/**
 * GET /api/users
 * @route GET /api/users.
 * @returns {Promise<void>}
 */

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

export async function POST(request) {
  if (!prisma) {
    prisma = new PrismaClient({ adapter });
  }

  try {
    const { id, storename, address, phone, country, state, market } =
      await request.json();
     
    const newBranch = await prisma.branch.create({
      data: {
        store: { connect: { id: id } },
        branchName: storename,
        branchAddress: address,
        phone: phone,
        country,
        state,
        market,
      },
      select: {
        id: true, // Include user ID in the response
        branchName: true, // Include user email in the response
          store: {
            select: {
              businessName: true,
            },
        },
      },
    });
    if (!newBranch) {
      throw new Error(`API request failed with status`);
    }
    return NextResponse.json({ data: newBranch });
  } catch (error) {
    console.error("Error fetching todo:", error);
    return NextResponse.error({ error: "Internal server error" });
  }
}
