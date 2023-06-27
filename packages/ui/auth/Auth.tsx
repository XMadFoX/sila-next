'use client';

import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, InputField } from '..';
import * as RadioGroup from '@radix-ui/react-radio-group';
import clsx from 'clsx';
import { signIn, SignInResponse, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function Auth() {
	const [value, setValue] = React.useState('default');
	const isRegister = value === 'register';
	const schema = z.object({
		email: z.string().email(),
		password: z.string().min(10),
		...(isRegister && { name: z.string().min(2) }),
	});
	const methods = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		mode: 'onChange',
		reValidateMode: 'onChange',
	});
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = methods;
	const [showPassword, setShowPassword] = React.useState(false);
	const router = useRouter();

	const [loggedIn, setLoggedIn] = React.useState(false);
	const handleResponse = (res: SignInResponse) => {
		if (res.error) {
			setError('password', {});
			setError('email', {});
			setError('root', { message: res.error, type: 'credentials' });
			return;
		}
		if (isRegister) router.replace('/auth/success?type=register_email');
		else setLoggedIn(true);
	};

	const session = useSession();

	useEffect(() => {
		if (loggedIn && session?.data?.user?.totpEnabled)
			setTimeout(() => router.replace('/auth/totp/verify'), 500);
		else if (loggedIn && window.history.length > 1) router.back();
	}, [loggedIn, session]);

	return (
		<div>
			<FormProvider {...methods}>
				<form
					className="flex flex-col gap-4 p-4"
					onSubmit={handleSubmit(async (d: z.infer<typeof schema>) => {
						console.log(d);
						const res = await signIn('credentials', {
							redirect: false,
							email: d.email,
							...(isRegister && { name: d.name }),
							password: d.password,
							register: isRegister,
						});
						console.log('res', res);
						res && handleResponse(res);
						// TODO: check is TOTP enabled on account, if not, send snackbar with link opening modal to enable
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
							<button
								type="button"
								onClick={() => setShowPassword((prev) => !prev)}
							>
								👁
							</button>
						}
					/>
					{errors?.root && (
						<label className="text-error">
							{errors.root.type === 'credentials'
								? 'Не правильный логин или пароль'
								: errors.root.message}
						</label>
					)}
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
