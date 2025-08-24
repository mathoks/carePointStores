import { cookies } from "next/headers";
import jsonwebtoken, { decode } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req) {
    const cookie = await cookies();
    const refreshToken = req.headers.get("authorization")?.split(' ')[1];
    if (!refreshToken) {
    return NextResponse.json({ message: "No refresh token found" });
  }

 
  try {
    const {exp, ...decoded} = jsonwebtoken.verify(refreshToken, process.env.AUTH_SECRET);
    const newAccessToken = jsonwebtoken.sign(
      { ...decoded },
      process.env.AUTH_SECRET,
      { expiresIn: "15m" } // Adjust expiration time as needed
    );

    cookie.set("authjs.session-token", newAccessToken, {
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: "lax",
      httpOnly: true,
      
    });
    const newDecoded = decode(newAccessToken);
    console.log(newDecoded, newAccessToken)
    return NextResponse.json(newDecoded, { status: 200 });
  } catch (error) {
    if (error instanceof jsonwebtoken.TokenExpiredError) {
      return NextResponse.json({ message: "Token expired" }, { status: 401});
    }
    return NextResponse.json({ message: "Invalid refresh token" }, { status: 401});
  }
}
