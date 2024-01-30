import { connect } from "@/db";
import Token from "@/models/token.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await connect()
    try {
        let tokens = await Token.find()
        return NextResponse.json({ status: 'success', data: { token_length: tokens.length } }, { status: 200 })
    }
    catch (err: any) {
        return NextResponse.json({ message: err.message, status: 'error' }, { status: err.statusCode ? err.statusCode : 500 })
    }
}
