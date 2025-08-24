// Example: POST /api/auth/register
import { NextResponse } from "next/server";
import prisma from "@/model/db";


export async function POST(req) {
  if (req.method === "POST") {
    try {
      const { email } = await req.json();
      const userExist = await prisma.user.findUnique({
        where: {
            
              email: email,
        },
        select: {
          email: true,
        },
      });

      if (userExist) {
        throw new Error({ message: "user Already exist" });
      }
      
      const result = await prisma.$transaction(async (prisma) => {
        const newUser = await prisma.user.create({
          data: {
            email,
          },
          select: { id: true, email: true }, // Only select necessary fields
        });

      //   const account = await prisma.account.create({
      //     data: {
      //       user: {
      //         connect: { id: newUser.id }
      //       },
      //       type: "email",
      //       provider: "email",
      //       providerAccountId: newUser.id,
      //     },
      //   });
        return { newUser };
       });
      if (!result) {
        throw new Error("User not created");
      }     
      return NextResponse.json(result, { status: 201 });
    } catch (error) {
      console.log(error)
       return NextResponse.error();
    }
  } else {
    // Handle other HTTP methods if needed (e.g., GET for user details)
  }
}
