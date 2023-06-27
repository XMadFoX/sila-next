'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../general';
import { useSession } from 'next-auth/react';
import { CodeInput } from './CodeInput';
import { schema } from './schema';
import { useRouter } from 'next/navigation';

export function LinkTOTP() {
	const session = useSession();
	const router = useRouter();

	const methods = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		mode: 'onChange',
		reValidateMode: 'onChange',
	});
	const {
		register,
		handleSubmit,
		setError,
		formState: { isValid },
	} = methods;

	const [alreadyEnabled, setAlreadyEnabled] = useState(false);

	useEffect(() => {
		console.log('session updated', session.data);
		if (session?.data?.user?.totpEnabled) setAlreadyEnabled(true);
		if (session?.data?.user?.totp) {
			router.back();
		} else {
			setError('code', { message: 'Неправильный код' });
		}
	}, [session]);

	return (
		<div className="flex flex-col">
			{!alreadyEnabled ? (
				<FormProvider {...methods}>
					<form
						className="flex flex-col gap-4 p-4"
						onSubmit={handleSubmit(async (d: z.infer<typeof schema>) => {
							console.log(d);
							session.update({ totpToken: d.code });
						})}
					>
						<legend className="text-xl font-bold">
							Включить двухфакторную аутентификацию
						</legend>
						<CodeInput {...register('code')} />
						<Button
							className="disabled:opacity-50"
							disabled={!isValid}
							type="submit"
						>
							Включить
						</Button>
					</form>
				</FormProvider>
			) : (
				<>
					<h2 className="text-center">
						Двухфакторная аутентификация уже включена
					</h2>
					<Button className="mx-auto mt-4" href="/auth/totp/disable" replace>
						Отключить
					</Button>
				</>
			)}
		</div>
	);
}
