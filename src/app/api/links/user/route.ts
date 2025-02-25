import { connect } from "@/database/mongo.config";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { Link } from "@/models/Links";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest, response:NextResponse) {
  try {
    await connect();

 const session =await getServerSession(request,response,authOptions); 
    console.log(session)
    console.log("Session Data:", session); // Debugging log

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userLinks = await Link.find({ userId: session.user.id }).sort({ createdAt: -1 });

    return NextResponse.json({ data: userLinks }, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
