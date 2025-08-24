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
 * GET /api/Product/productId/reviews
 * @route GET /api/Product/productId/reviews.
 * @returns {Promise<void>}
 */

if (!prisma) {
  prisma = new PrismaClient({ adapter });
}

async function updateProductRating(reviewId, category_id, prima) {
  // Fetch the product associated with the review
  const product = await prima.prod_reviews.findUnique({
    where: { reviewId: {
       id: reviewId,
       category_id: Number(category_id) 
    }},
    select: { prod_id: true },
  });

  if (!product) {
    throw new Error("ProdReview not found"); // Clearer error message
  }

  // Calculate the average rating for the product's reviews (excluding the current review)
  const averageRating = await prima.prod_reviews.aggregate({
    where: {
      prod_id: product.prod_id,
      NOT: { id: reviewId }, // Exclude the current review
    },
    _avg: {
      review: true, // Calculate average of the 'review' field
    },
  });

  if(!averageRating)throw new Error('cant find average');
  // Update the product with the new average rating
 const Average = await prima.product.update({
    where: { id: product.prod_id },
    data: { rating: averageRating._avg.review || 0 }, // Set default to 0 if no reviews
  });
  if(!Average)throw new Error('cant update average')
    return averageRating 
}

export async function POST(req) {
  if (req.method === "POST") {
    try {
      const data = await req.json();
      const { text, prodId, reviewer, value, category_id } = data;
      const result = await prisma.$transaction(async(prima)=>{
        const newReview = await prisma.prod_reviews.create({
          data: {
            comment: text,
            prod_id: prodId,
            user_id: reviewer,
            review: value,
            category_id: Number(category_id)
          },
          select: { id: true }, // Only select necessary fields
        });
  
        if (!newReview || newReview === null || newReview === 'undefined') {
          throw new Error("Review creation failed"); // More specific error message
        }
  
       const averageRating = await updateProductRating(newReview.id, category_id, prima);
        return averageRating
      })
      if(result){
      revalidateTag('reviewstats')
      revalidateTag('userreview')
      return NextResponse.json({ Average: result || 0 });
      }
    } catch (error) {
      console.error(error);
      return NextResponse.error();
    }
  } else {
    // Handle other methods if needed
  }
}