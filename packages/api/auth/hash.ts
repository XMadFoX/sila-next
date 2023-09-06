import crypto from 'crypto';

export async function hash(password: string) {
	const salt = crypto.randomBytes(16).toString('hex');
	const hash = crypto
		.pbkdf2Sync(password, salt, 1000, 64, 'sha512')
		.toString('hex');
	return { salt, hash };
}

export async function verify(password: string, saltHash: string) {
	const [salt, hash] = saltHash.split(':');
	const hashVerify = crypto
		.pbkdf2Sync(password, salt, 1000, 64, 'sha512')
		.toString('hex');
	return hash === hashVerify;
}
