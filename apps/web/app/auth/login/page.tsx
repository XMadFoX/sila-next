import React from 'react';
import { Auth } from 'ui/auth';
import { StandaloneModal } from 'ui/utils';

export default function page() {
	return (
		<StandaloneModal>
			<Auth />
		</StandaloneModal>
	);
}
