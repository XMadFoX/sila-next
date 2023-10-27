'use client';

import React from 'react';
import { StandaloneModal } from 'ui/utils';
import dynamic from 'next/dynamic';
const LinkTOTP = dynamic(
	() => import('ui/auth/totp').then((mod) => mod.LinkTOTP),
	{
		ssr: false,
	}
);

export default function page() {
	return (
		<StandaloneModal>
			<LinkTOTP />
		</StandaloneModal>
	);
}
