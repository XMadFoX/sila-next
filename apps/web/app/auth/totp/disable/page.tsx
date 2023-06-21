import React from 'react';
import { DisableTOTP } from 'ui/auth/totp';
import { StandaloneModal } from 'ui/utils';

export default function page() {
	return (
		<StandaloneModal>
			<DisableTOTP />
		</StandaloneModal>
	);
}
