// pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

interface User {
  id: string; // Ensure this matches your backend's user ID type
  name: string;
  email: string;
}

interface CustomJWT extends Record<string, any> {
  id: string;
  email: string;
  name: string;
}

// Extend the default session type
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
    };
  }
}

const options: NextAuthOptions = {
  pages: {
    signIn: '/qmaster/counter',
    signOut: '/login',
    error: '/auth/error',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          console.error("No credentials provided");
          return null;
        }

        const { email, password } = credentials;
        try {
          const response = await axios.post(process.env.API_BASE_URL_LOGIN as string, {
            email,
            password,
          });

          const user: User = response.data;

          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error("Error during authorization:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Authorization error');
          } else {
            console.error("Unknown error during authorization:", error);
            throw new Error('Authorization error');
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        email: token.email as string,
      };
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.JWT_SECRET as string,
  },
};

export default NextAuth(options);
