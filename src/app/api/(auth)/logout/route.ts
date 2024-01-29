import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const response = NextResponse.json({ data: "true" })
    response.cookies.delete("token");
    return response
}