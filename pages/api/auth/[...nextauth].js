import NextAuth from "next-auth/next"

import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

import db from "../../../utils/db"
import User from "../../../models/user"


export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    // JSON Web Token
    strategy: "jwt"
  },

  callbacks: {
    // adjust the token and the user
    // token: from next/auth
    // user: from database
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id.toString()
        token.isAdmin = user.isAdmin
      }
      // the user is authenticated by token
      return token
    },

    // adjust the session and the token
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id
        session.user.isAdmin = token.isAdmin
      }
      return session
    }
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await db.connect()
        const user = await User.findOne({ email: credentials.email })
        // check password for an existing user
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: "f",
            isAdmin: user.isAdmin
          }
        }
        // error
        throw new Error("Invalid email or password")
      }
    })
  ]
})