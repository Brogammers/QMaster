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
      // name: string;
      email: string;
    };
  }
}

const options: NextAuthOptions = {
  pages: {
    signIn: '/qmaster/counter',
    signOut: '/login',
    error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        if (credentials) {
          console.log("Credentials provided: ", credentials);
        }

        if (!credentials) {
          console.log("No credentials provided");
          return null;
        }

        const { email, password } = credentials;
        try {
          console.log(API_BASE_URL_LOGIN);
          const response = await axios.post(`${API_BASE_URL_LOGIN}`, {
            email,
            password,
          });
          console.log("Response from API: ", response);
          const user: User = response.data;

          if (user) {
            console.log("User authenticated successfully");
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error during authorization:", error);
          console.log("Error object: ", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("USER ID: " + user.id);
        console.log("USER EMAIL: " + user.email);
        console.log("User object: ", user);
        token.id = user.id;
        token.email = user.email;
        // token.name = user.name;
      }
      console.log("Token object: ", token);
      return token;
    },
    async session({ session, token }) {
      const customToken = token as CustomJWT;
      if (customToken) {
        session.user = {
          ...session.user,
          id: customToken.id,
          email: customToken.email,
          // name: customToken.name,
        };
      }
      console.log("Session object: ", session);
      return session;
    },
  },
};

export default NextAuth(options);
