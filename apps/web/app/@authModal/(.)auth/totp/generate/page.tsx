import React from 'react';
import { Modal } from 'ui';
import { GenerateTOTP } from 'ui/auth/totp';

export default function page() {
	return (
		<Modal>
			<GenerateTOTP />
		</Modal>
	);
}
