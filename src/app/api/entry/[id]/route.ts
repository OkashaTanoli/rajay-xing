import { connect } from '@/db';
import Entry from '@/models/entry.model';
import { CustomError } from '@/utils/customError';
import { NextRequest, NextResponse } from 'next/server'


export async function DELETE(request: NextRequest, params: { params: { id: string } }) {
    await connect()
    try {
        let entry = await Entry.findOneAndDelete({ _id: params.params.id })
        return NextResponse.json({ status: 'success', message: 'Entry deleted successfully', entry }, { status: 200 })
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
            type: body.type,
            name: body.name,
            fName: body.fName,
            cnic: body.cnic,
            address: body.address,
            dateTimeOut: body.dateTimeOut,
            dateTimeIn: body.dateTimeIn
        }
        if (body.type === 'local') {
            data = {
                ...data,
                vehsType: body.vehsType,
                accompanyingFamilyMembersName: body.accompanyingFamilyMembersName,
                cnicOfFamilyMembers: body.cnicOfFamilyMembers,
                relation: body.relation,
                guestName: body.guestName,
                cnicOfGuest: body.cnicOfGuest,
                addressOfGuest: body.addressOfGuest,
                childrenNos: body.childrenNos,
            }
        }
        else if (body.type === 'fuelTrade') {
            data = {
                ...data,
                driverName: body.driverName,
                secondSeater: body.secondSeater,
                chassisNumber: body.chassisNumber,
                engineNumber: body.engineNumber,
                regnNo: body.regnNo,
            }
        }
        console.log(data);

        let entry = await Entry.findOneAndUpdate({ _id: params.params.id }, { ...data })
        return NextResponse.json({ status: 'success', message: 'Entry updated successfully', entry }, { status: 200 })
    }
    catch (err: any) {
        return NextResponse.json({ message: err.message, status: 'error' }, { status: err.statusCode ? err.statusCode : 500 })
    }
}