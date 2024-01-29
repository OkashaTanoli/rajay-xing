import { connect } from "@/db";
import Entry from "@/models/entry.model";
import Token from "@/models/token.model";
import { CustomError } from "@/utils/customError";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connect()
        let body = await request.json();
        let details = JSON.parse(request.headers.get('verifiedJwt') as string)
        if (!body.type && !body.name && !body.cnic && !body.driverName && !body.entryId) {
            throw new CustomError('Please fill all the fields', 400)
        }
        await Entry.findOneAndUpdate({ _id: body.entryId }, { dateTimeOut: new Date() })

        let data = {
            type: body.type,
            name: body.name,
            cnic: body.cnic,
            driverName: body.driverName,
            image: body.image,
            createdBy: details.id,
            entry: body.entryId
        }
        let token = await Token.create(data)
        return NextResponse.json({
            message: "Token created successfully",
            token: token,
            status: 'success'
        })
    }
    catch (err: any) {
        return NextResponse.json({ message: err.message, status: 'error' }, { status: err.statusCode ? err.statusCode : 500 })
    }
}



export async function GET(request: NextRequest) {
    const regex = new RegExp(request.nextUrl.searchParams.get('search')!, 'i');
    await connect()
    try {

        const query: any = {
            $or: [
                { name: regex },
                { cnic: regex },
                { driverName: regex },
            ]
        };

        // Check if 'text' is a valid ObjectId
        if (mongoose.isValidObjectId(request.nextUrl.searchParams.get('search')!)) {
            query.$or.push({ _id: new mongoose.Types.ObjectId(request.nextUrl.searchParams.get('search')!) });
        }
        let entries = await Token.find(query);
        return NextResponse.json({ status: 'success', data: entries }, { status: 200 })
    }
    catch (err: any) {
        return NextResponse.json({ message: err.message, status: 'error' }, { status: err.statusCode ? err.statusCode : 500 })
    }
}
