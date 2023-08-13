'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../general';
import { CodeInput } from './CodeInput';
import { schema } from './schema';
import { useRouter } from 'next/navigation';
import safeBack from '../../utils/safeBack';
import { toast } from 'react-toastify';
import useSession from '../../useSession';
import { trpc } from '../../lib';

export function LinkTOTP() {
	const { data: session, invalidate } = useSession();
	const { mutate } = trpc.totp.linkTotp.useMutation({
		onSuccess: () => {
			safeBack(window, router);
			toast.success('Поключено');
			invalidate();
		},
		onError: (err) => {
			setError('code', { message: err.message });
		},
	});
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
		if (session?.user?.totpEnabled) setAlreadyEnabled(true);
	}, [session]);

	return (
		<div className="flex flex-col">
			{!alreadyEnabled ? (
				<FormProvider {...methods}>
					<form
						className="flex flex-col gap-4 p-4"
						onSubmit={handleSubmit((d: z.infer<typeof schema>) => {
							mutate(d.code);
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
