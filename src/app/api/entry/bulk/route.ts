import { IFormSchema } from "@/utils/zodschema";
import { NextRequest, NextResponse } from "next/server";
import Entry from '@/models/entry.model'
import { CustomError } from "@/utils/customError";
import { connect } from "@/db";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
    try {
        await connect()
        let body: IFormSchema[] = await request.json()
        let details = JSON.parse(request.headers.get('verifiedJwt') as string)

        let data = body.map((item) => ({
            ...item,
            createdBy: details.id,
            dateTimeOut: null,
            dateTimeIn: null,
        }))


        await Entry.create(data)
        return NextResponse.json({ message: 'Entry completed successfully', status: "success" }, { status: 200 })
    }
    catch (err: any) {
        return NextResponse.json({ message: err.message, status: 'error' }, { status: err.statusCode ? err.statusCode : 500 })
    }

}




export async function DELETE(request: NextRequest) {
    await connect();
    try {
        const { ids } = await request.json();
        if (!ids || ids.length === 0) {
            throw new CustomError('No IDs provided', 400);
        }

        const result = await Entry.deleteMany({ _id: { $in: ids } });

        if (result.deletedCount === 0) {
            throw new CustomError('No entries found to delete', 404);
        }

        return NextResponse.json({ status: 'success', message: 'Entries deleted successfully', deletedCount: result.deletedCount }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ message: err.message, status: 'error' }, { status: err.statusCode ? err.statusCode : 500 })

    }
}