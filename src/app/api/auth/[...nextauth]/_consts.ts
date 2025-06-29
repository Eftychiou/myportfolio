import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          // prompt: 'select_account',
          redirect_uri: process.env.OAUTH_REDIRECT_URI
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user }) {
      // Only allow a specific email
      if (user.email === process.env.ADMIN_ALLOWED_EMAIL) {
        return true;
      }
      return false; // reject others
    }
  },
  pages: {
    error: '/auth/error'
  }
  // Optional: customize pages, callbacks, session strategy, etc.
};
