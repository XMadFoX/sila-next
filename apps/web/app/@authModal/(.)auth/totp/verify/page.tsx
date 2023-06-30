import React from 'react';
import { Modal } from 'ui';
import { VerifyTOTP } from 'ui/auth/totp';

export default function page() {
	return (
		<Modal>
			<VerifyTOTP />
		</Modal>
	);
}
