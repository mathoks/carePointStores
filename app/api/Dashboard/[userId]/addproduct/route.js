import { NextResponse } from "next/server";
import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";

// Create a single instance of the Prisma client for efficiency
let prisma;
const neon = new Pool({
  connectionString: process.env.POSTGRES_PRISMA_URL,
});

const adapter = new PrismaNeon(neon);

export async function POST(req) {
  // Ensure Prisma client is initialized only once per request
  if (!prisma) {
    prisma = new PrismaClient({ adapter });
  }

  if (req.method === "POST") {
    try {
     const {
        name,
        categoryId,
        price,
        availability,
        negotiable,
        link,
        description,
        prodImage,
        storeId
     } = await req.json();
    
       const result = await prisma.$transaction(async(prima) => {
        const newProd = await prima.Product.create({
          data: {
            storeId,
            name,
            description,
            negotiable,
            availability,
            price,
            categoryId,
          },
          select: { id: true }, // Only select necessary fields
        });
        
        if(link !== null){
        await prima.ProductBranch.create({
          data: {
           productId: newProd.id,
           branchId: link
          },
        });
      }
            const Images = [ prodImage[0],  prodImage[1]]
            await prima.ProdImage.createMany({
            data: [{
             prodId: newProd.id,
             image: Images[0].url
            },
            {
              prodId: newProd.id,
              image: Images[1].url
             }]
          });
        return  newProd.id;
      });
      if (!result) {
        throw new Error("product not added");
      }
      
       revalidateTag('store')
       revalidatePath('/api/home')
      return NextResponse.json(result, { status: 201 });
    } catch (error) {
      return NextResponse.error()
    }
    finally{
        await prisma.$disconnect();
    }
  } else {
    // Handle other HTTP methods if needed (e.g., GET for user details)
  }
}