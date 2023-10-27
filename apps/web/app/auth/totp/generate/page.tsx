'use client';

import React from 'react';
import { StandaloneModal } from 'ui/utils';
import dynamic from 'next/dynamic';
const GenerateTOTP = dynamic(
	() => import('ui/auth/totp/Generate').then((m) => m.GenerateTOTP),
	{ ssr: false }
);

export default function page() {
	return (
		<StandaloneModal>
			<GenerateTOTP />
		</StandaloneModal>
	);
}
