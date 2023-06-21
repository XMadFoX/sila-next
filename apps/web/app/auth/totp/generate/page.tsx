import React from 'react';
import { GenerateTOTP } from 'ui/auth/totp';
import { StandaloneModal } from 'ui/utils';

export default function page() {
	return (
		<StandaloneModal>
			<GenerateTOTP />
		</StandaloneModal>
	);
}
