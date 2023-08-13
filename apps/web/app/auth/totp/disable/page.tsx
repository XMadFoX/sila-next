'use client';
import React from 'react';
import { StandaloneModal } from 'ui/utils';
import dynamic from 'next/dynamic';
const DisableTOTP = dynamic(
	() => import('ui/auth/totp/Disable').then((m) => m.DisableTOTP),
	{ ssr: false }
);

export default function page() {
	return (
		<StandaloneModal>
			<DisableTOTP />
		</StandaloneModal>
	);
}
