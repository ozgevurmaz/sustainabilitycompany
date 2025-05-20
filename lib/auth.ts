import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { connectToDB } from "./MongoDB";
import { Admin } from "@/models/admin";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDB();

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const admin = await Admin.findOne({ email: credentials.email.toLowerCase().trim() });
        if (!admin) {
          console.log("Admin not found");
          return null;
        }

        const isMatch = await bcrypt.compare(credentials.password, admin.password);

        if (!isMatch) {
          console.log("Wrong password");
          return null;
        }

        if (!isMatch) return null;

        return { id: admin._id, name: "Admin", email: admin.email, role: "admin" };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
