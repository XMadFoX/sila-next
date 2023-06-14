import { eq } from 'drizzle-orm';
import { authenticator } from 'otplib';
import { db, users } from './schema';
import crypto from 'crypto';

export async function checkTotpCode(code: string, userEmail: string) {
	const { totpSecret, totp } = await db
		.select({ totpSecret: users.totpSecret, totp: users.totp })
		.from(users)
		.where(eq(users.email, userEmail))
		.get();
	if (!totpSecret) throw new Error('No secret generated yet');
	const isValid = authenticator.check(code, totpSecret);
	if (!isValid) throw new Error('Invalid code');
	return totp;
}
