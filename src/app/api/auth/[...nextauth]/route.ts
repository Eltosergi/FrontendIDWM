import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { authClient } from '@/clients';
import { LoginRequest } from '@/models';
import { jwtDecode } from 'jwt-decode';



import type { NextAuthOptions } from 'next-auth';

interface TokenPayload {
  role: string;
}
const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({

      name: 'credentials',
      
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const loginData: LoginRequest = {
            email: credentials.email,
            password: credentials.password,
          };

          const response = await authClient.login(loginData);

          if (response.success && response.data) {
            return {
              id: response.data.email,
              name: `${response.data.firtsName} ${response.data.lastName}`,
              email: response.data.email,
              accessToken: response.data.token,
              
            };
          }

          return null;
        } catch (error) {
          console.error('Error en authorize:', error);
          return null;
        }
      },

    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        
        const decoded = jwtDecode<TokenPayload>(user.accessToken);
        const role = decoded.role;
        
        token.accessToken = user.accessToken;
        token.userId = user.id;
        token.role = role || 'user'; 
        
        console.log('JWT Callback:', {
          accessToken: token.accessToken,
          userId: token.userId,
          role: role,
        });

      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.user.id = token.userId;
        session.user.accessToken = token.accessToken;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
