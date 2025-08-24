import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import { del } from "@vercel/blob";
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
      const { id, link, url, ...rest } = data;
      const result = await prisma.$transaction(async (prima) => {
        const newProd = await prima.product.update({
          where: { id:id },
          data: rest,
          select: { id: true }, // Only select necessary fields
        });

        

        
        if (Array.isArray(link) && link.length > 0) {    
           for (const linki of link) {
            const isbranch = await prima.ProductBranch.findUnique({
              where: { id : linki },
              select: { id: true },
            });
            if(isbranch === null) {
               await prima.ProductBranch.create({
                data: {
                  productId: id,
                  branchId: linki,
                },
              });
            }
           else { 
            await prima.ProductBranch.delete({
              where: { id: isbranch.id },
            });
          }
          }
          }
      
        if (Array.isArray(url) && url.length > 0) {
         
          for (const urls of url) {
            
            await prima.ProdImage.update({
              where: { id: urls.ids },
              data: {
                image: urls.img,
              },
            });

            await del(urls.url);
          }
        }
        return newProd.id;
      });

      if (!result) throw new Error("operation was unsuccessfull");
      return NextResponse.json({ data: result });
    } catch (error) {
      console.log(error);
      return Response.json({ message: "Internal server error" });
    }
  } 
}
