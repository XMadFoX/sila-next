'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';
import { CodeInput } from './CodeInput';
import { Button } from '../../general';
import { useRouter } from 'next/navigation';
import safeBack from '../../utils/safeBack';
import { toast } from 'react-toastify';
import useSession from '../../useSession';
import { trpc } from '../../lib';

export function VerifyTOTP({ closeModal }: { closeModal?: () => void }) {
	const { data: session, invalidate: refresh } = useSession();
	const { mutate } = trpc.totp.verifyTotp.useMutation({
		onSuccess: () => {
			refresh();
		},
	});

	const methods = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		mode: 'onChange',
		reValidateMode: 'onChange',
	});
	const { register, handleSubmit, setError } = methods;

	const router = useRouter();

	useEffect(() => {
		console.log('session updated', session);
		if (session?.user?.totp) {
			console.log('totp present, going back');
			safeBack(window, router);
			closeModal && closeModal();
			toast.success('Успешный вход');
		} else setError('code', { message: 'Неверный код' });
	}, [session]);

	return (
		<FormProvider {...methods}>
			<form
				className="flex flex-col gap-4 p-4"
				onSubmit={handleSubmit((d: z.infer<typeof schema>) => {
					mutate(d.code);
				})}
			>
				<CodeInput {...register('code')} />
				<Button type="submit">Войти</Button>
			</form>
		</FormProvider>
	);
}
