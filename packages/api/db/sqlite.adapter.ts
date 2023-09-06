import crypto from 'node:crypto';
import { Adapter, AdapterAccount } from '@auth/core/adapters';
import { eq, and } from 'drizzle-orm';
import { users, accounts, sessions, verificationTokens, db } from '..';

export type DbClient = typeof db;

export const defaultSchema = { users, accounts, sessions, verificationTokens };
export type DefaultSchema = typeof defaultSchema;
interface CustomSchema extends DefaultSchema {}

export function SQLiteDrizzleAdapter(
	client: DbClient,
	schema?: Partial<CustomSchema>
): Adapter {
	const { users, accounts, sessions, verificationTokens } = {
		users: schema?.users ?? defaultSchema.users,
		accounts: schema?.accounts ?? defaultSchema.accounts,
		sessions: schema?.sessions ?? defaultSchema.sessions,
		verificationTokens:
			schema?.verificationTokens ?? defaultSchema.verificationTokens,
	};

	return {
		createUser: (data) => {
			console.log('createUser', data);
			return client
				.insert(users)
				.values({ ...data, name: '', id: crypto.randomUUID() })
				.returning()
				.get();
		},

		getUser: (data) => {
			console.log('getUser', data);
			return (
				client.select().from(users).where(eq(users.id, data)).get() ?? null
			);
		},

		getUserByEmail: (data) => {
			console.log('getUserByEmail', data);
			return (
				client.select().from(users).where(eq(users.email, data)).get() ?? null
			);
		},

		createSession: async (data) => {
			console.log('createSession', data);
			const retdata = client.insert(sessions).values(data).returning().get();
			console.log('create session response', retdata);
			return retdata;
		},

		getSessionAndUser: async (data) => {
			console.log('getSessionAndUser', data);
			const reurnData =
				client
					.select({
						session: sessions,
						user: users,
					})
					.from(sessions)
					.where(eq(sessions.sessionToken, data))
					.innerJoin(users, eq(users.id, sessions.userId))
					.get() ?? null;
			console.log('getSessionAndUser return', reurnData);
			return reurnData;
		},

		updateUser: (data) => {
			console.log('updateUser', data);
			if (!data.id) {
				throw new Error('No user id.');
			}

			return client
				.update(users)
				.set(data as any)
				.where(eq(users.id, data.id))
				.returning()
				.get();
		},

		updateSession: (data) => {
			console.log('updateSession', data);
			return client
				.update(sessions)
				.set(data)
				.where(eq(sessions.sessionToken, data.sessionToken))
				.returning()
				.get();
		},

		linkAccount: async (rawAccount) => {
			console.log('linkAccount', rawAccount);
			const updatedAccount = await client
				.insert(accounts)
				.values({
					...rawAccount,
					expires_at: new Date(rawAccount?.expires_at || new Date()),
				})
				.returning()
				.get();

			const account: AdapterAccount = {
				...updatedAccount,
				type: updatedAccount.type,
				access_token: updatedAccount.access_token ?? undefined,
				token_type: updatedAccount.token_type ?? undefined,
				id_token: updatedAccount.id_token ?? undefined,
				refresh_token: updatedAccount.refresh_token ?? undefined,
				scope: updatedAccount.scope ?? undefined,
				expires_at: updatedAccount?.expires_at?.getMilliseconds() ?? undefined,
				session_state: updatedAccount.session_state ?? undefined,
			};

			return account;
		},

		getUserByAccount: async (account) => {
			console.log('getUserByAccount', account);
			const dbAccount = client
				.select()
				.from(accounts)
				.where(
					and(
						eq(accounts.providerAccountId, account.providerAccountId),
						eq(accounts.provider, account.provider)
					)
				)
				.get();

			if (!dbAccount) return null;

			const user = client
				.select()
				.from(users)
				.where(eq(users.id, (await dbAccount).userId))
				.get();

			return user;
		},

		deleteSession: (sessionToken) => {
			console.log('deleteSession', sessionToken);
			return (
				client
					.delete(sessions)
					.where(eq(sessions.sessionToken, sessionToken))
					.returning()
					.get() ?? null
			);
		},

		createVerificationToken: (token) => {
			console.log('createVerificationToken', token);
			return client
				.insert(verificationTokens)
				.values({ ...token, userId: null })
				.returning()
				.get();
		},

		// useVerificationToken: (token) => {
		// 	console.log('useVerificationToken', token);
		// 	try {
		// 		return (
		// 			client
		// 				.delete(verificationTokens)
		// 				.where(
		// 					and(
		// 						eq(verificationTokens.identifier, token.identifier),
		// 						eq(verificationTokens.token, token.token)
		// 					)
		// 				)
		// 				.returning()
		// 				.get() ?? null
		// 		);
		// 	} catch (err) {
		// 		throw new Error('No verification token found.');
		// 	}
		// },

		deleteUser: (id) => {
			console.log('deleteUser', id);
			return client.delete(users).where(eq(users.id, id)).returning().get();
		},

		unlinkAccount: (account) => {
			console.log('unlinkAccount', account);
			client
				.delete(accounts)
				.where(
					and(
						eq(accounts.providerAccountId, account.providerAccountId),
						eq(accounts.provider, account.provider)
					)
				)
				.run();

			return undefined;
		},
	};
}
