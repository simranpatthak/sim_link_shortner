import { connect } from "@/database/mongo.config";
import { User } from "@/models/User";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";



export const authOptions: AuthOptions = {
    pages:{
        signIn:"/login" // defined our custom page . as next auth gives default page
    },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "auth sim link", // this name will be visible in the login page,
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "enter your password",
        },
      },
      async authorize(credentials,res) {
        // return funtion that will be called when user click on login button
        connect()
        const user = await User.findOne({ email: credentials?.email });

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
};
