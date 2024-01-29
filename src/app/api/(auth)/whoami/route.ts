import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    let details = JSON.parse(request.headers.get('verifiedJwt') as string)
    if (!details) {
        return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 403 })
    }
    // const user = await User.findOne({ _id: details.id })
    const userDetails = {
        id: details.id, name: details.name, email: details.email, role: details.role
    }
    return NextResponse.json({ userDetails }, { status: 200 })
}