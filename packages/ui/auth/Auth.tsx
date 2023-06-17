'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, InputField } from '..';
import { ErrorMessage } from '@hookform/error-message';

export function Auth() {
	const [isRegister, setRegister] = React.useState(true);
	const schema = z.object({
		email: z.string().email(),
		password: z.string().min(10),
		...(isRegister && { name: z.string().min(2) }),
	});

	const methods = useForm({
		resolver: zodResolver(schema),
		mode: 'onChange',
		reValidateMode: 'onChange',
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = methods;
	const [showPassword, setShowPassword] = React.useState(false);

	return (
		<div>
			<button onClick={() => setRegister((p) => !p)}>toggle</button>
			<FormProvider {...methods}>
				<form
					className="flex flex-col gap-2 p-4"
					onSubmit={handleSubmit((d) => {
						console.log(d);
					})}
				>
					{isRegister && (
						<InputField
							{...register('name')}
							placeholder="Имя или псевдоним"
							errors={errors}
						/>
					)}
					<InputField
						{...register('email')}
						placeholder="Почта"
						type="email"
						errors={errors}
					/>

					<InputField
						{...register('password')}
						placeholder="Пароль"
						type={showPassword ? 'text' : 'password'}
						errors={errors}
						rightItem={
							<button onClick={() => setShowPassword((prev) => !prev)}>
								👁
							</button>
						}
					/>
					<ErrorMessage errors={errors} name="age" />
					<Button type="submit" rounded="lg">
						Submit
					</Button>
				</form>
			</FormProvider>
		</div>
	);
}
