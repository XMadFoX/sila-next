'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../general';
import { trpc } from '../../lib/trpc';
import { useSession } from 'next-auth/react';
import { CodeInput } from './CodeInput';
import { schema } from './schema';

export function LinkTOTP() {
	const { mutate, error } = trpc.auth.linkTotp.useMutation();
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
				<form
					className="flex flex-col gap-4 p-4"
					onSubmit={handleSubmit(async (d: z.infer<typeof schema>) => {
						console.log(d);
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
		</div>
	);
}
