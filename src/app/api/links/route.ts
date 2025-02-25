import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";
import { v4 as uuidv4 } from "uuid";
import { connect } from "@/database/mongo.config";
import { Link } from "@/models/Links";
import { linkSchema } from "@/validator/linkSchema";

connect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validator = vine.compile(linkSchema);
    const payload = await validator.validate(body);

    // Generate a unique short ID
    const shortId = uuidv4().slice(0, 8);
    const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

    // Save in DB
    const newLink = await Link.create({
      userId: payload.userId,
      url: payload.url,
      shortId: shortId,
    });

    return NextResponse.json(
      {
        status: 200,
        message: "Link shortened successfully!",
        data: {
          shortUrl: `${BASE_URL}/${shortId}`,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json({ status: 400, errors: error.messages }, { status: 400 });
    }
    return NextResponse.json(
      { status: 500, errors: { message: "Internal server error!" } },
      { status: 500 }
    );
  }
}
