'use client';

import { zodResolver } from '@hookform/resolvers/zod';
// import { newEventSchema } from '@sila/api'; // causes better-sql fs not found lol
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { InputField, InputFieldProps } from '../input';
import { z } from 'zod';
import { Button } from '../general';

const newEventSchema = z.object({
	title: z.string().min(3).max(64),
	description: z.string().min(3).max(255),
	// later image id on CF images
	coverImage: z.string().min(3).max(255).url(),
	duration: z.number().int().min(0).optional(),
	isOnline: z.boolean().optional(),
	isFree: z.boolean().optional(),
	registrationUrl: z.string().min(3).max(512).url().optional(),
	eventTypeId: z.number().int().optional(),
	timestamp: z.date(),
	// oraganizationId: z.number().int().optional(),
});

export function NewEvent() {
	const methods = useForm<z.infer<typeof newEventSchema>>({
		resolver: zodResolver(newEventSchema),
	});
	const { handleSubmit } = methods;

	return (
		<div>
			<FormProvider {...methods}>
				<form
					onSubmit={handleSubmit(async (d) => {
						console.log(d);
					})}
				>
					<EventInputField
						aria-label="Заголовок"
						{...methods.register('title')}
					/>
					<EventInputField
						aria-label="Описание"
						{...methods.register('description')}
					/>
					<EventInputField
						aria-label="Начало"
						type="datetime-local"
						{...methods.register('timestamp')}
					/>
					<EventInputField
						aria-label="Обложка"
						{...methods.register('coverImage')}
					/>
					<EventInputField
						aria-label="Тип"
						{...methods.register('eventTypeId')}
					/>
					<EventInputField
						aria-label="Онлайн"
						type="checkbox"
						{...methods.register('isOnline')}
					/>
					<EventInputField
						aria-label="Бесплатно"
						type="checkbox"
						{...methods.register('isFree')}
					/>
					<EventInputField
						aria-label="Ссылка на регистраю"
						{...methods.register('registrationUrl')}
					/>
					<Button type="submit">Отправить</Button>
				</form>
			</FormProvider>
		</div>
	);
}

const EventInputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
	(props, ref) => {
		return <InputField labelVisible {...props} ref={ref} />;
	}
);
EventInputField.displayName = 'EventInputField';
