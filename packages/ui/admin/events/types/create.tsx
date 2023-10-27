'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { trpc } from '../../../lib';
import { Button } from '../../../general';
import { InputField } from '../../../input';
import { kind } from '@sila/api/ads/eventTypes';

const insertEventTypesSchema = z.object({
	name: z.string(),
});

export default function CreateEvent({ kind }: { kind: kind }) {
	const methods = useForm<z.infer<typeof insertEventTypesSchema>>({
		resolver: zodResolver(insertEventTypesSchema),
		mode: 'onChange',
		reValidateMode: 'onChange',
	});
	const {
		register,
		handleSubmit,
		setError,
		formState: { isValid },
	} = methods;

	const utils = trpc.useContext();
	const { mutate } = trpc.events.types.create.useMutation({
		onSuccess: () => {
			utils.events.types.list.invalidate();
		},
	});

	return (
		<div>
			<FormProvider {...methods}>
				<form
					className="flex flex-col gap-2"
					onSubmit={handleSubmit(({ name }) => {
						mutate({ name, kind });
					})}
				>
					<legend className="text-lg font-bold">Создать новый тип</legend>
					<InputField
						aria-label="Название"
						labelVisible
						{...register('name')}
						rightItem={
							<Button
								aria-label="Создать"
								size={null}
								className="w-6 h-6"
								type="submit"
							>
								+
							</Button>
						}
					/>
				</form>
			</FormProvider>
		</div>
	);
}
