import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Hardcoded admin for now (replace with DB lookup later)
        const admin = { email: "admin@example.com", password: "securepass", role: "admin" };

        if (credentials?.email === admin.email && credentials?.password === admin.password) {
          return { id: "1", name: "Admin", email: admin.email, role: admin.role };
        }
        return null;
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
    signIn: "/admin/login", // Custom login page
  },
  secret: process.env.NEXTAUTH_SECRET, // Set in .env file
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
