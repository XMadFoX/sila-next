'use client';

import React, { useEffect, useState } from 'react';
import { trpc } from '../../lib/trpc';

import QRCode from 'qrcode';
import Link from 'next/link';
import { cn } from '../../lib';
import { Button } from '../../general';

export function GenerateTOTP() {
	const { mutate, data, isError } = trpc.totp.generateTotp.useMutation();
	const canvasRef = React.useRef(null);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (!data) return;
		QRCode.toCanvas(canvasRef.current, data).then(() => setLoaded(true));
	}, [data]);

	useEffect(() => {
		mutate();
	}, []);

	return (
		<div className="flex flex-col max-w-xl text-black">
			{!isError ? (
				<>
					<h1 className="text-xl text-center text-bold">
						Давайте подключим Двух-факторную аутентификацию
					</h1>
					<p className="text-center underline">чтобы защитить Ваш аккаунт!</p>
					<p className="text-sm opacity-75 hover:opacity-100">
						Отсканируйте этот QR код в приложении поддерживающим TOTP, например
						<Link
							className="ml-2 underline text-blue"
							href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
							target="_blank"
						>
							Google Authentificator
						</Link>{' '}
						(
						<Link
							className="underline text-blue"
							href="https://apps.apple.com/us/app/google-authenticator/id388497605"
							target="_blank"
						>
							IOS
						</Link>
						)
					</p>
				</>
			) : (
				<h1 className="mb-4 text-xl text-center text-error">
					Похоже у Вас уже подключена двух-факторная аутентификация
				</h1>
			)}

			<canvas
				className={cn(
					'mx-auto my-2 w-64 bg-black transition-all duration-1000',
					!loaded && 'animate-pulse',
					isError ? 'h-0' : 'h-64'
				)}
				id="canvas"
				ref={canvasRef}
			></canvas>

			{!isError ? (
				<Button className="mx-auto" href="/auth/totp/link" replace>
					Далее
				</Button>
			) : (
				<Button className="mx-auto" href="/auth/totp/disable" replace>
					Отключить
				</Button>
			)}
		</div>
	);
}
