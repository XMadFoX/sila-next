import React from 'react';
import { Modal } from 'ui';
import { LinkTOTP } from 'ui/auth/totp';

export default function page() {
	return (
		<Modal>
			<LinkTOTP />
		</Modal>
	);
}
