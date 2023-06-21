'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../general';
import { InputField } from '../../input';
import { trpc } from '../../lib/trpc';

const schema = z.object({
	code: z.string().length(6),
});

export function DisableTOTP() {
	const { mutate, error } = trpc.auth.unlinkTotp.useMutation();

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
					<InputField
						aria-label="Код из аутентфикатора"
						labelVisible
						placeholder="000000"
						type="number"
						min={0}
						max={999999}
						{...register('code')}
					/>
					<p className="underline text-error text-bold">
						Это сделает Ваш аккаунт более уязвимым!
					</p>
					<Button
						className="disabled:opacity-50"
						disabled={!isValid}
						type="submit"
					>
						Подтвердить
					</Button>
				</form>
			</FormProvider>
		</div>
	);
}
