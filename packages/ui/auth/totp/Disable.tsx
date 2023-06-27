'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../general';
import { trpc } from '../../lib/trpc';
import { CodeInput } from './CodeInput';
import { schema } from './schema';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function DisableTOTP() {
	const { mutate, error, isSuccess, isLoading } =
		trpc.auth.unlinkTotp.useMutation();
	const [notLinked, setNotLinked] = useState(false);
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

	useEffect(() => {
		setError('code', { message: error?.message });
	}, [error]);

	const session = useSession();

	useEffect(() => {
		if (!session?.data?.user?.totpEnabled) {
			setNotLinked(true);
		}
		if (isSuccess) router.back();
	}, [session]);

	useEffect(() => {
		session.update({ totpToken: null });
	}, [isSuccess]);

	if (notLinked)
		return (
			<div>
				<h2>Двухфакторная аутентификация не включена</h2>
				<Button className="mt-4" href="/auth/totp/generate" replace>
					Включить
				</Button>
			</div>
		);

	return (
		<div>
			<FormProvider {...methods}>
				<legend className="text-xl font-bold">
					Отключить двухфакторную аутентификацию
				</legend>
				<form
					className="flex flex-col gap-4 p-4"
					onSubmit={handleSubmit(async (d: z.infer<typeof schema>) => {
						console.log(d);
						mutate(d.code);
					})}
				>
					<CodeInput {...register('code')} />
					<p className="underline text-error text-bold">
						Это сделает Ваш аккаунт более уязвимым!
					</p>
					<Button
						className="disabled:opacity-50"
						disabled={!isValid || isLoading || isSuccess}
						type="submit"
					>
						{isLoading
							? 'Загрузка...'
							: isSuccess
							? 'Отключено!'
							: 'Подтвердить'}
					</Button>
				</form>
			</FormProvider>
		</div>
	);
}
