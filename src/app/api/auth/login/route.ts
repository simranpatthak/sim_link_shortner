import { connect } from "@/database/mongo.config";
import { User } from "@/models/User";
import { loginSchema } from "@/validator/authSchema";
import vine, { errors } from "@vinejs/vine";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
// for DB connection
connect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validator = vine.compile(loginSchema);
    const payload = await validator.validate(body);
    const existUser = await User.findOne({ email: payload.email });
    if (!existUser) {
      return NextResponse.json(
        { status: 400, errors:{ message:"Email with user not  exists !"} },
        { status: 200 }
      );
    }
    const isMatch = await bcrypt.compare(payload.password, existUser.password);
    if (!isMatch) {
      return NextResponse.json(
        { status: 400, errors: {message:"Invalid credentials !" }},
        { status: 200 }
      );
    }
    return NextResponse.json(
      { status: 200, message: "Successfully login !" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        { status: 400, errors: error.messages },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { status: 500, errors:{ message:"Internal server error !"} },
      { status: 200 }
    );
  }
}
