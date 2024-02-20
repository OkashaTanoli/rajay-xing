import { connect } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import Entry from '@/models/entry.model'
import Token from "@/models/token.model";

export async function POST(request: NextRequest) {
    let body = await request.json()
    let startDate = new Date(body.startDate);
    let endDate = new Date(body.endDate);
    // If not considering time or if both dates are the same
    endDate.setUTCHours(23, 59, 59, 999); // Set to the last moment of the day

    // startDate = startDate.toISOString() as any
    // endDate = endDate.toISOString() as any
    await connect()
    console.log(startDate, endDate);

    try {
        // let entries = await Entry.find({ type: request.nextUrl.searchParams.get('type'), $text: { $search: request.nextUrl.searchParams.get('search')! } })
        let filteredConditions: any = {
            type: body.type,
            createdAt: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        }
        if (body.cnicOfPerson) {
            filteredConditions = {
                ...filteredConditions,
                cnic: body.cnicOfPerson
            }
        }
        if (body.type === 'fuelTrade' && body.destination) {
            filteredConditions = {
                ...filteredConditions,
                destination: body.destination
            }
        }
        if(body.type === 'token'){
            delete filteredConditions.type
        }
        if (body.type !== 'token') {

            let entries = await Entry.find(filteredConditions);

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
                        destination: entry.destination
                    };
                }

                return data;
            });

            // 'formattedEntries' now contains the array of formatted data

            return NextResponse.json({ status: 'success', data: formattedEntries }, { status: 200 })
        }
        else {
            let tokens = await Token.find(filteredConditions)
            let formattedTokens = tokens.map((token) => {
                return {
                    type: token.type,
                    name: token.name,
                    cnic: token.cnic,
                    driverName: token.driverName,
                    regNo: token.regnNo
                }
            })
            return NextResponse.json({ status: 'success', data: formattedTokens }, { status: 200 })
        }
    }
    catch (err: any) {
        return NextResponse.json({ message: err.message, status: 'error' }, { status: err.statusCode ? err.statusCode : 500 })
    }
}
