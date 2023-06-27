import { eq } from 'drizzle-orm';
import { authenticator } from 'otplib';
import { db, users } from './schema';
import crypto from 'crypto';

export async function checkTotpCode(code: string, userEmail: string) {
	const randomBytes = crypto.randomBytes(10).toString('hex');
	const { totpSecret, totp, totpEnabled } = await db
		.select({
			totpSecret: users.totpSecret,
			totp: users.totp,
			totpEnabled: users.totpEnabled,
		})
		.from(users)
		.where(eq(users.email, userEmail))
		.get();
	if (!totpSecret) throw new Error('No secret generated yet');
	const isValid = authenticator.check(code, totpSecret);
	if (!isValid) throw new Error('Invalid code');
	if (!totpEnabled)
		db.update(users)
			.set({ totpEnabled: new Date(), totp: randomBytes })
			.where(eq(users.email, userEmail))
			.run();
	return totp || randomBytes;
}
