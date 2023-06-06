import { db } from '@sila/api';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { SQLiteDrizzleAdapter } from './sqlite.adapter';
import { authorize } from '@sila/api/user';

export const authOptions: AuthOptions = {
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: 'Email',
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				email: {
					label: 'Email',
					type: 'text',
					placeholder: 'jsmith@example',
				},
				name: { label: 'Name', type: 'text' },
				password: {
					label: 'Password',
					placeholder: 'Cool#Password5263',
					type: 'password',
				},
			},
			async authorize(credentials, req) {
				return await authorize(req.body as any);
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
