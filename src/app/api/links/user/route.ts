import { connect } from "@/database/mongo.config";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { Link } from "@/models/Links";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET(request: NextRequest) {
  try {
    await connect();

 const session =await getServerSession(authOptions); 
 console.log("----------",session);
 
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session?.user?.id;
    if (!userId) return;
    const userLinks = await Link.find({ userId }).sort({ createdAt: -1 });
    
    return NextResponse.json({ data: userLinks }, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
