import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

// Define the configuration object directly
const authOptions: NextAuthConfig = {
  session: {
    strategy: 'jwt', // Type should match "jwt" | "database" | undefined
    maxAge: 864000000, // 10 days
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        const { email, password } = credentials;

        try {
          const response = await axios.post(`${process.env.API_BASE_URL_LOGIN}`, {
            email,
            password,
          });

          const user = response.data;

          if (user && user.token) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              token: user.token,
            };
          }

          return null;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error("Error during authorization:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Authorization error');
          } else {
            console.error("Unknown error during authorization:", error);
            throw new Error('Authorization error');
          }
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any, user?: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        email: token.email as string,
      };
      return session;
    },
  },
  // secret: process.env.JWT_SECRET, // Moved to top level as per NextAuth v5
};

// Export the handlers directly
export const { handlers: { GET, POST }, auth } = NextAuth(authOptions);
