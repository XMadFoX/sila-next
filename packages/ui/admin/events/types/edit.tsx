'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { trpc } from '../../../lib';
import { Button } from '../../../general';
import { InputField } from '../../../input';
import { Check, X } from 'lucide-react';
import { useEffect, useRef } from 'react';

const insertEventTypesSchema = z.object({
	name: z.string(),
});

export default function EditEvent({
	value,
	id,
	cancel,
}: {
	value: string;
	id: number;
	cancel: () => void;
}) {
	const methods = useForm<z.infer<typeof insertEventTypesSchema>>({
		resolver: zodResolver(insertEventTypesSchema),
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: { name: value },
	});
	const {
		register,
		handleSubmit,
		setFocus,
		formState: { isValid },
	} = methods;

	const utils = trpc.useContext();
	const { mutate } = trpc.events.types.update.useMutation({
		onSuccess: () => {
			utils.events.types.list.invalidate();
			cancel();
		},
	});

	useEffect(() => {
		setFocus('name');
	}, []);

	return (
		<div className="w-full">
			<FormProvider {...methods}>
				<form
					className="flex flex-col gap-2 w-full"
					onSubmit={handleSubmit(({ name }) => {
						mutate({ id, name });
					})}
				>
					<InputField
						aria-label="Название"
						{...register('name')}
						className="w-full h-8"
						rightItem={
							<div className="flex gap-1">
								<Button
									aria-label="Отмена"
									size={null}
									className="flex justify-center items-center w-6 h-6"
									type="button"
									onClick={cancel}
								>
									<X className="w-5 h-5" />
								</Button>
								<Button
									aria-label="Создать"
									size={null}
									className="flex justify-center items-center w-6 h-6"
									type="submit"
								>
									<Check className="w-5 h-5" />
								</Button>
							</div>
						}
					/>
				</form>
			</FormProvider>
		</div>
	);
}
