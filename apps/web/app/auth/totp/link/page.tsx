import React from 'react';
import { LinkTOTP } from 'ui/auth/totp';
import { StandaloneModal } from 'ui/utils';

export default function page() {
	return (
		<StandaloneModal>
			<LinkTOTP />
		</StandaloneModal>
	);
}
