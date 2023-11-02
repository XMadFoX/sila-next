import Turnstile, { TurnstileProps } from 'react-turnstile';
import { env } from '@sila/env';

export function Captcha(props: Omit<TurnstileProps, 'sitekey'>) {
	return (
		<div>
			<Turnstile
				{...props}
				language="ru"
				sitekey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
			/>
		</div>
	);
}
