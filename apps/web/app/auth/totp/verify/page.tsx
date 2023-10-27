'use client';

import React from 'react';
import dynamic from 'next/dynamic';
const VerifyTOTP = dynamic(
	() => import('ui/auth/totp').then((mod) => mod.VerifyTOTP),
	{
		ssr: false,
	}
);

export default function Page() {
	return <VerifyTOTP />;
}
