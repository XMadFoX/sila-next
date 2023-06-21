import React from 'react';
import { GenerateTOTP, LinkTOTP, DisableTOTP } from 'ui/auth/totp';

export default function page() {
	return (
		<div>
			<GenerateTOTP />
			<hr />
			<LinkTOTP />
			<hr />
			<DisableTOTP />
		</div>
	);
}
