import crypto from 'crypto';
import { env } from './env.mjs';

const algorithm = 'aes-256-ctr';
const secretKey = env.ESECRET;

const salt = crypto.randomBytes(16); // Generate a random salt

function getKey(salt: Buffer) {
	return crypto.pbkdf2Sync(secretKey, salt, 100000, 32, 'sha512');
}

const key = getKey(salt);

export function encrypt(value: string): string {
	const iv = crypto.randomBytes(16); // Generate a random initialization vector
	const cipher = crypto.createCipheriv(algorithm, key, iv);
	let encryptedValue = cipher.update(value, 'utf8', 'hex');
	encryptedValue += cipher.final('hex');
	return salt.toString('hex') + iv.toString('hex') + encryptedValue;
}

export function decrypt(encryptedValue: string): string {
	const salt = Buffer.from(encryptedValue.slice(0, 32), 'hex'); // Extract the salt from the encrypted value
	const key = getKey(salt); // Derive the key using the salt
	const iv = Buffer.from(encryptedValue.slice(32, 64), 'hex'); // Extract the initialization vector from the encrypted value
	const decipher = crypto.createDecipheriv(algorithm, key, iv);
	let decryptedValue = decipher.update(encryptedValue.slice(64), 'hex', 'utf8');
	decryptedValue += decipher.final('utf8');
	return decryptedValue;
}
