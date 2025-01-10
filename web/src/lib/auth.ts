import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.email === "admin@qmaster.com" && credentials?.password === "admin") {
          return { id: "1", email: "admin@qmaster.com", role: "admin" };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
  }
}; 