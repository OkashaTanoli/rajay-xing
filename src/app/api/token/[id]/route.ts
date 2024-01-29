import { connect } from '@/db';
import Token from '@/models/token.model';
import { NextRequest, NextResponse } from 'next/server'


export async function DELETE(request: NextRequest, params: { params: { id: string } }) {
    await connect()
    try {
        let token = await Token.findOneAndDelete({ _id: params.params.id })
        return NextResponse.json({ status: 'success', message: 'Token deleted successfully', token }, { status: 200 })
    }
    catch (err: any) {
        return NextResponse.json({ message: err.message, status: 'error' }, { status: err.statusCode ? err.statusCode : 500 })
    }
}


export async function PATCH(request: NextRequest, params: { params: { id: string } }) {
    await connect()
    try {
        let body = await request.json()

        let data: any = {
            name: body.name,
            cnic: body.cnic,
            driverName: body.driverName,
        }
        console.log(data);

        let token = await Token.findOneAndUpdate({ _id: params.params.id }, { ...data })
        return NextResponse.json({ status: 'success', message: 'Token updated successfully', token }, { status: 200 })
    }
    catch (err: any) {
        return NextResponse.json({ message: err.message, status: 'error' }, { status: err.statusCode ? err.statusCode : 500 })
    }
}