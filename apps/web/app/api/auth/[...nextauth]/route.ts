import { db } from '@sila/api';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { SQLiteDrizzleAdapter } from './sqlite.adapter';

export const authOptions: AuthOptions = {
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: 'Credentials',
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				username: {
					label: 'Email',
					type: 'text',
					placeholder: 'jsmith@example',
				},
				password: { label: 'Password', type: 'Cool#Password5263' },
			},
			async authorize(credentials, req) {
				// Add logic here to look up the user from the credentials supplied
				const user = {
					id: '1',
					name: 'J Smith',
					email: 'jsmith@example.com',
				};

				if (user) {
					// Any object returned will be saved in `user` property of the JWT
					return user;
				} else {
					// If you return null then an error will be displayed advising the user to check their details.
					return null;

					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		EmailProvider({
			server: 'smtp://username:password@localhost:2525',
			from: 'username@email.com',
		}),
	],
	adapter: SQLiteDrizzleAdapter(db) as any,
	session: {
		strategy: 'jwt',
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
