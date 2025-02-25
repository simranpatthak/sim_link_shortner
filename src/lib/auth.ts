import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options"; // Correct path

export async function auth() {
  return await getServerSession(authOptions);
}
