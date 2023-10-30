import NodeMailer from 'nodemailer';
import { env } from '@sila/env';

const transport = NodeMailer.createTransport({
	from: env.SMTP_FROM,
	host: env.SMTP_HOST,
	port: env.SMTP_PORT,
	secure: env.SMTP_SECURE,
	auth: {
		user: env.SMTP_USER,
		pass: env.SMTP_PASS,
	},
});

export default transport;
