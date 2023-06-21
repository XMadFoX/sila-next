'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../general';
import { InputField } from '../../input';
import { trpc } from '../../lib/trpc';

const schema = z.object({
	code: z.string().length(6),
});

export function Link() {
	const { mutate, data, error } = trpc.auth.linkTotp.useMutation();
	const methods = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		mode: 'onChange',
		reValidateMode: 'onChange',
	});
	const {
		register,
		handleSubmit,
		setError,
		formState: { isValid, errors },
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
					<InputField
						type="number"
						placeholder="000000"
						labelVisible
						aria-label="Код из аутентификатора"
						min={0}
						max={999999}
						{...register('code')}
					/>
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
