'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { InputField } from '../input';
import { Button } from '../general';
import { trpc } from '../lib';

const updateProfileSchema = z.object({
	name: z.string().min(3),
	email: z.string().email(),
});

export default function Profile() {
	const methods = useForm<z.infer<typeof updateProfileSchema>>({
		resolver: zodResolver(updateProfileSchema),
		mode: 'onChange',
		reValidateMode: 'onChange',
	});
	const {
		register,
		handleSubmit,
		setError,
		setValue,
		formState: { isValid },
	} = methods;

	const { data } = trpc.auth.session.useQuery(undefined, {
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchOnMount: false,
	});

	useEffect(() => {
		if (!data) return;
		setValue('name', data?.user.name);
		setValue('email', data?.user.email);
	}, [data, setValue]);

	const { mutate } = trpc.auth.update.useMutation();

	return (
		<>
			<div className="flex mt-10">
				<FormProvider {...methods}>
					<form
						className="flex flex-col gap-7 mr-auto w-full max-w-sm"
						onSubmit={handleSubmit((d) => {
							mutate(d);
						})}
					>
						<InputField
							aria-label="Имя пользователя"
							labelVisible
							disabled
							className="cursor-not-allowed"
							{...register('name')}
						/>
						<InputField
							aria-label="Email"
							labelVisible
							disabled
							className="cursor-not-allowed"
							{...register('email')}
						/>
					</form>
				</FormProvider>
				{/* <Button */}
				{/* 	intent="outlined" */}
				{/* 	className="py-3.5 px-5 mb-auto text-black uppercase" */}
				{/* 	wrapperClassName="mb-'auto" */}
				{/* 	bg="var(--white)" */}
				{/* 	size={null} */}
				{/* > */}
				{/* 	Удалить аккаунт */}
				{/* </Button> */}
			</div>
			<Button
				className="py-3.5 px-5 mt-9 uppercase opacity-50"
				title="Пока не доступно"
				disabled
				size={null}
			>
				Сменить пароль
			</Button>
		</>
	);
}
