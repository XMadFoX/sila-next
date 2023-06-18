'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, InputField } from '..';
import { ErrorMessage } from '@hookform/error-message';
import * as RadioGroup from '@radix-ui/react-radio-group';
import clsx from 'clsx';

export function Auth() {
	const [value, setValue] = React.useState('default');
	const isRegister = value === 'register';
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
			<FormProvider {...methods}>
				<form
					className="flex flex-col gap-4 p-4"
					onSubmit={handleSubmit((d) => {
						console.log(d);
					})}
				>
					<RadioGroup.Root
						className="flex gap-2.5"
						defaultValue="login"
						aria-label="View density"
						onValueChange={setValue}
					>
						{[
							{ id: 'login', value: 'login', label: 'Вход' },
							{ id: 'register', value: 'register', label: 'Регистрация' },
						].map((item) => (
							<RadioItem
								key={item.id}
								setValue={setValue}
								checked={value === item.value}
								{...item}
							/>
						))}
					</RadioGroup.Root>
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
					<Button
						type="submit"
						rounded="lg"
						className="w-full h-11"
						size={null}
					>
						{isRegister ? 'Регистрация' : 'Войти'}
					</Button>
				</form>
			</FormProvider>
		</div>
	);
}

function RadioItem({ id, value, label }: any) {
	return (
		<div className="flex items-center">
			<RadioGroup.Item className="peer" value={value} id={id}>
				<RadioGroup.Indicator className="hidden" />
			</RadioGroup.Item>
			<label
				className={clsx(
					'peer-aria-checked:before:w-full before:h-0.5',
					'relative before:absolute before:w-0 before:bg-primary before:-bottom-2',
					'before:duration-300 before:transition-all'
				)}
				htmlFor={id}
			>
				{label}
			</label>
		</div>
	);
}
