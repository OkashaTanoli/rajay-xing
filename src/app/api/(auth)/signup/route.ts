import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { ISignUpSchema, signUpSchema } from "@/utils/zodschema";
import { connect } from "@/db";
import User from "@/models/user.model";
import { CustomError } from "@/utils/customError";




export async function POST(request: NextRequest) {
    try {
        await connect()
        const body: ISignUpSchema = await request.json()
        let result = signUpSchema.safeParse(body)
        if (!result.success) {
            let zodErrors = {}
            result.error.issues.forEach((issue) => {
                zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
            })
            return NextResponse.json({ errors: zodErrors, status: 'error' }, { status: 400 })
        }

        const oldUser = await User.find({ email: body.email })
        console.log(oldUser);

        if (oldUser.length) {
            throw new CustomError('User with this email already exists', 409)
        }
        const hashedPass = await bcrypt.hash(body.password, 10)
        await User.create(
            {
                name: body.name,
                email: body.email,
                password: hashedPass,
                role: body.role
            }
        )
        return NextResponse.json({ message: 'User registered successfully', status: "success" }, { status: 200 })
    }

    catch (err: any) {
        return NextResponse.json({ message: err.message, status: 'error' }, { status: err.statusCode ? err.statusCode : 500 })
    }
}