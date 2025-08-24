import prisma from "@/model/db";

import { NextResponse } from "next/server";

// Create a single instance of the Prisma client for efficiency
// let prisma;
// const neon = new Pool({
//   connectionString: process.env.POSTGRES_PRISMA_URL,
// });

// const adapter = new PrismaNeon(neon);

/**
 * GET /api/store/
 * @route GET /api/store.
 * @returns {Promise<void>}
 */

export async function GET(req) {
  const storeId = req.url.split("/")[6];

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: storeId,
      },
      select: {
        name: true,
        shipping_address: true,
        orders: true,
        email: true,
        image: true,
      },
    });
    if (user === null) {
      return NextResponse.json({ data: null });
    }
    return NextResponse.json(user);
  } catch (error) {
    return Response.json({error: 'bad'});
  }
}
