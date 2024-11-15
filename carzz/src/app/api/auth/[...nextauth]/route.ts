import { Prisma } from "@prisma/client";
import { create } from "domain";
import { Session } from "inspector/promises";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";

export const authOptions = {
  session: {
    strategy: 'jwt', // Use JWT strategy for session management
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // Optional: Customize JWT and session handling
    async signIn({ account, profile }) {
      // If the user is logging in for the first time (via Google)
      if(!profile.email){
        throw new Error('no profile')
      }

      await Prisma.user.upsert({
        where:{
          email: profile.email
        },
        create:{
          email: profile.email,
          name: profile.name
        },
        update:{
          name: profile.name
        }
      })

      return true;
    },
    Session,
    async jwt({ token, account, user, profile }) {
      // If the user is logging in for the first time (via Google)
      if (profile) {
        const user = await Prisma.user.findUniquew({
          where:{
            email:profile.email
          }
        })
        if(!user){
          throw new Error('no user found')
        }
        token.id = user.id;  // Add user ID to the token (optional)
        token.email = user.email;  // Add email to the token (optional)
        token.name = user.name;  // Add name to the token (optional)
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,  // Add secret for JWT encryption
};

export default NextAuth(authOptions);
