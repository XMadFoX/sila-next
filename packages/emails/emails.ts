import { envCore } from '@sila/env';
import transport from './transport';

export async function sendMail({
	to,
	subject,
	html,
	from = envCore.SMTP_FROM,
}: {
	to: string;
	subject: string;
	html: string;
	from?: string;
}) {
	transport.sendMail({
		to,
		from,
		subject,
		html,
	});
}
