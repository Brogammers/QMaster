// pages/api/auth/[...nextauth].ts
import { API_BASE_URL_LOGIN } from '@env';
import axios from 'axios';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

interface User {
  id: string; // Update the type of id to be a string
  name: string;
  email: string;
}

interface CustomJWT extends Record<string, any> {
  id: string; // Update the type of id to be a string
  email: string;
  name: string;
}

// Extend the default session type
declare module 'next-auth' {
  interface Session {
    user: {
      id: string; // Update the type of id to be a string
      name: string;
      email: string;
    };
  }
}

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        if (!credentials) {
          return null;
        }

        const { username, password } = credentials;
        try {
          const response = await axios.post(`${API_BASE_URL_LOGIN}`, {
            username,
            password,
          });
          const user: User = response.data;

          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      const customToken = token as CustomJWT;
      if (customToken) {
        session.user = {
          ...session.user,
          id: customToken.id,
          email: customToken.email,
          name: customToken.name,
        };
      }
      return session;
    },
  },
};

export default NextAuth(options);
