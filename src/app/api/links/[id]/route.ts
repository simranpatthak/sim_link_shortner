import { connect } from "@/database/mongo.config";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { Link } from "@/models/Links";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connect();

    // ✅ Corrected: Use getServerSession(authOptions)
    const session =await getServerSession(authOptions); 
    console.log(session);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Ensure session has user data
    if (!session.user || !session.user.id ) {
      return NextResponse.json({ error: "Invalid session" }, { status: 400 });
    }

    // ✅ Delete link for logged-in user only
    const deletedLink = await Link.findOneAndDelete({ _id: params.id, userId: session.user.id });

    if (!deletedLink) {
      return NextResponse.json({ error: "Link not found!" }, { status: 404 });
    }

    return NextResponse.json({ message: "Link deleted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
