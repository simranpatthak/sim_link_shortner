import { connect } from "@/database/mongo.config";
import { User } from "@/models/User";
import { registerSchema } from "@/validator/authSchema";
import vine, { errors } from "@vinejs/vine";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
// for DB connection
connect();

export async function POST (request:NextRequest) {
    try {
        const body =await request.json()
        const validator  = vine.compile(registerSchema)
        const payload = await validator.validate(body)
        const salt = await bcrypt.genSalt(10)
        payload.password = await bcrypt.hash(payload.password,salt)
     const existUser =    await User.findOne({email:payload.email})
    if(existUser){
      return NextResponse.json({status:400,errors:{message:"Email already exists !"}},{status:200})
    }
        await User.create(payload)

        return NextResponse.json({status:200,message:"Account created successfully !"},{status:200})
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            return NextResponse.json({status:400,errors:error.messages},{status:200})
        }
        return NextResponse.json({status:500,errors:{message:"Internal server error !"}},{status:200})
    }

}
