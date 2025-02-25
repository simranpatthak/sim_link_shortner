import { connect } from "@/database/mongo.config";
import { Link } from "@/models/Links";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { shortId: string } }) {
  try {
    await connect();
    const { shortId } = params;
    const link = await Link.findOneAndUpdate(
      { shortId },
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!link) {
      return NextResponse.json({ status: 404, error: "Link not found!" }, { status: 404 });
    }

    return NextResponse.redirect(link.url, 302);
  } catch (error) {
    console.error("Error in GET API:", error);
    return NextResponse.json(
      { status: 500, error: "Internal server error!" },
      { status: 500 }
    );
  }
}
