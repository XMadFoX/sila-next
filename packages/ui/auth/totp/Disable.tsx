'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../general';
import { trpc } from '../../lib/trpc';
import { CodeInput } from './CodeInput';
import { schema } from './schema';
import { useRouter } from 'next/navigation';
import safeBack from '../../utils/safeBack';
import useSession from '../../useSession';

export function DisableTOTP() {
	const { mutate, error, isSuccess, isLoading } =
		trpc.totp.unlinkTotp.useMutation();
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

	const { data: session } = useSession();

	useEffect(() => {
		if (session?.user && !session?.user?.totpEnabled) {
			console.log('not linked');
			setNotLinked(true);
		} else setNotLinked(false);
		if (isSuccess) safeBack(window, router);
	}, [session]);

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
