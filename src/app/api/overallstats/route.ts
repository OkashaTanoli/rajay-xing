import Token from "@/models/token.model";
import { NextResponse } from "next/server";
import { startOfDay, endOfDay } from "date-fns";
import Entry from "@/models/entry.model";

export async function GET() {
    try {
        const now = new Date();

        const startOfToday = startOfDay(now);
        const endOfToday = endOfDay(now);

        let token_data = await Token.find({
            createdAt: {
                $gte: startOfToday,
                $lt: endOfToday
            }
        })

        // let entry_data = await Entry.find({
        //     createdAt: {
        //         $gte: startOfToday,
        //         $lt: endOfToday
        //     }
        // })

        let paktoiranlocal = await Entry.find({
            type: 'local',
            dateTimeOut: {
                $gte: startOfToday,
                $lt: endOfToday
            }
        })
        let paktoiranofficial = await Entry.find({
            type: 'fuelTrade',
            dateTimeOut: {
                $gte: startOfToday,
                $lt: endOfToday
            }
        })
        let irantopaklocal = await Entry.find({
            type: 'local',
            dateTimeIn: {
                $gte: startOfToday,
                $lt: endOfToday
            }
        })
        let irantopakofficial = await Entry.find({
            type: 'fuelTrade',
            dateTimeIn: {
                $gte: startOfToday,
                $lt: endOfToday
            }
        })

        // let paktoiranlocal = entry_data.filter((val) => val.type === 'local' && val.dateTimeOut)
        // let paktoiranofficial = entry_data.filter((val) => val.type === 'fuelTrade' && val.dateTimeOut)
        // let irantopaklocal = entry_data.filter((val) => val.type === 'local' && val.dateTimeIn)
        // let irantopakofficial = entry_data.filter((val) => val.type === 'fuelTrade' && val.dateTimeIn)

        let data = {
            tokens: token_data.length,
            // entries: entry_data.length,
            paktoiranlocal: paktoiranlocal.length,
            paktoiranofficial: paktoiranofficial.length,
            irantopaklocal: irantopaklocal.length,
            irantopakofficial: irantopakofficial.length
        }

        return NextResponse.json({ status: 'success', data })
    }
    catch (err: any) {
        return NextResponse.json({ message: err.message, status: 'error' }, { status: err.statusCode ? err.statusCode : 500 })
    }
}