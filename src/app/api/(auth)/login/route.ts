import { connect } from "@/db";
import User from "@/models/user.model";
import { ISignInSchema, signInSchema } from "@/utils/zodschema";
import bcrypt from 'bcrypt'
import { CustomError } from "@/utils/customError";
import { NextRequest, NextResponse } from "next/server";
import * as jose from 'jose'


export async function POST(request: NextRequest) {
    try {
        await connect()
        const body: ISignInSchema = await request.json()
        let result = signInSchema.safeParse(body)
        if (!result.success) {
            let zodErrors = {}
            result.error.issues.forEach((issue) => {
                zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
            })
            return NextResponse.json({ errors: zodErrors, status: 'error' }, { status: 400 })
        }

        const user = await User.find({ email: body.email })
        console.log('user === > ', user);

        if (!user.length) {
            throw new CustomError('No user found with this email', 401)
        }
        console.log(user[0].password);

        const match = await bcrypt.compare(body.password, user[0].password)
        if (!match) {
            throw new CustomError('Incorrect password', 401)
        }
        const alg = "HS256";
        const secret = new TextEncoder().encode(
            process.env.JWT_SECRET
        )
        const token = await new jose.SignJWT({
            id: user[0]._id,
            email: user[0].email,
            name: user[0].name,
            role: user[0].role
        })
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setExpirationTime("7d")
            .sign(secret);

        const response = NextResponse.json({
            status: 'success',
            message: "Login successfully",
            data: {
                id: user[0]._id,
                email: user[0].email,
                name: user[0].name,
                role: user[0].role
            }
        })
        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response
    }
    catch (err: any) {
        return NextResponse.json({ message: err.message, status: 'error' }, { status: err.statusCode ? err.statusCode : 500 })
    }
}
