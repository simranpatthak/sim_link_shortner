import { connect } from "@/database/mongo.config";
import { User } from "@/models/User";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login", // Custom sign-in page
  },
  providers: [
    CredentialsProvider({
      name: "Auth Sim Link",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },
      async authorize(credentials) {
        await connect();
        const user = await User.findOne({ email: credentials?.email });

        if (!user) return null; // If no user found, return null
        
        return {
          id: user._id.toString(), // Convert ObjectId to string
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id ;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Attach user ID to token
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
