import { connect } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import Entry from '@/models/entry.model'
import Token from "@/models/token.model";

export async function POST(request: NextRequest) {
    let body = await request.json()
    let startDate = new Date(body.startDate);
    let endDate = new Date(body.endDate);
    // If not considering time or if both dates are the same
    endDate.setHours(23, 59, 59, 999); // Set to the last moment of the day
    await connect()
    try {
        // let entries = await Entry.find({ type: request.nextUrl.searchParams.get('type'), $text: { $search: request.nextUrl.searchParams.get('search')! } })
        if (body.type !== 'token') {

            let entries = await Entry.find({
                type: body.type,
                createdAt: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                }
            });

            let formattedEntries = entries.map(entry => {
                // Basic data structure
                let data: any = {
                    type: entry.type,
                    name: entry.name,
                    fName: entry.fName,
                    cnic: entry.cnic,
                    address: entry.address,
                    dateTimeOut: entry.dateTimeOut,
                    dateTimeIn: entry.dateTimeIn,
                };

                // Additional fields based on type
                if (body.type === 'local') {
                    data = {
                        ...data,
                        vehsType: entry.vehsType,
                        accompanyingFamilyMembersName: entry.accompanyingFamilyMembersName,
                        cnicOfFamilyMembers: entry.cnicOfFamilyMembers,
                        relation: entry.regnNo,
                        guestName: entry.guestName,
                        cnicOfGuest: entry.cnicOfGuest,
                        addressOfGuest: entry.addressOfGuest,
                        childrenNos: entry.childrenNos,
                    };
                } else if (body.type === 'fuelTrade') {
                    data = {
                        ...data,
                        driverName: entry.driverName,
                        secondSeater: entry.secondSeater,
                        chassisNumber: entry.chassisNumber,
                        engineNumber: entry.engineNumber,
                        regnNo: entry.regnNo,
                    };
                }

                return data;
            });

            // 'formattedEntries' now contains the array of formatted data

            return NextResponse.json({ status: 'success', data: formattedEntries }, { status: 200 })
        }
        else {
            let tokens = await Token.find()
            let formattedTokens = tokens.map((token) => {
                return {
                    type: token.type,
                    name: token.name,
                    cnic: token.cnic,
                    driverName: token.driverName,
                }
            })
            return NextResponse.json({ status: 'success', data: formattedTokens }, { status: 200 })
        }
    }
    catch (err: any) {
        return NextResponse.json({ message: err.message, status: 'error' }, { status: err.statusCode ? err.statusCode : 500 })
    }
}
