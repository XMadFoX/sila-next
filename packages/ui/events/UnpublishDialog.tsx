import React from 'react';
import { trpc } from '../lib';
import { linkMap } from '../card';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputField } from '../input';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '../input/DialogPrimitives';
import { Button } from '../general';

const schema = z.object({
	message: z.union([z.literal(''), z.string().min(1)]).transform((v) => {
		if (v === '') {
			return undefined;
		}
		return v;
	}),
});

export function UnpublishDialog({
	id,
	kind,
	open,
	close,
}: {
	id: number;
	kind: 'event' | 'project';
	open: boolean;
	close: () => void;
}) {
	const utils = trpc.useContext();
	const methods = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
	});
	const {
		register,
		handleSubmit,
		setError,
		formState: { isValid },
	} = methods;

	const { mutate } = trpc.events.updateStatus.useMutation({
		onSuccess: () => {
			utils.events.getOne.invalidate({ id, kind });
			close();
		},
	});

	const onSubmit: SubmitHandler<z.infer<typeof schema>> = ({ message }) => {
		mutate({
			id,
			kind,
			status: 'changesRequested',
			message,
		});
	};

	return (
		<Dialog open={open} defaultOpen={true}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Снять с публикации</DialogTitle>
				</DialogHeader>
				<FormProvider {...methods}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<>
							<InputField
								aria-label="Сообщение"
								labelVisible
								{...register('message')}
							/>
						</>

						<DialogFooter className="mt-4">
							<Button
								size={'sm'}
								intent="outlined"
								bg="var(--white)"
								className="text-black"
								type="button"
								onClick={() => close()}
							>
								Омена
							</Button>
							<Button size={'sm'} intent="primary" type="submit">
								Снять с публикации
							</Button>
						</DialogFooter>
					</form>
				</FormProvider>
			</DialogContent>
		</Dialog>
	);
}
