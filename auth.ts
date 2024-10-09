import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import prisma from "./lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcryptjs"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./schemas"

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    error: "/error",
    signIn: "/login",

  },
  providers: [GitHub, Credentials({
     authorize : async (credentials) => {
      const validatedFields = LoginSchema.safeParse(credentials);
      if (!validatedFields.success) {
          return null; 
      }
  
      const { email, password } = validatedFields.data;
  
      const user = await prisma.user.findUnique({
          where: {
              email,
          },
      });
  
      if (!user || !user.password) {
          return null; 
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
          return null; 
  
      }
        
        return user;

  }})],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    session: async({session, token  }) => {
      if(session.user) {
        session.user.id = token.sub as string;
      }
      return session;


    },
    jwt: async({token }) => {
     
      return token;
    }
  }

})