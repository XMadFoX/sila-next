'use client';

import { zodResolver } from '@hookform/resolvers/zod';
// import { newEventSchema } from '@sila/api'; // causes better-sql fs not found lol
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { InputField, InputFieldProps } from '../input';
import { z } from 'zod';
import { Button } from '../general';
import { Calendar } from '../input/Calendar';
import { ErrorMessage } from '@hookform/error-message';

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
	date: z.date().min(new Date()),
	time: z.string(),
	// oraganizationId: z.number().int().optional(),
});

export function NewEvent() {
	const methods = useForm<z.infer<typeof newEventSchema>>({
		resolver: zodResolver(newEventSchema),
	});
	const { handleSubmit } = methods;
	const [date, setDate] = React.useState<Date | undefined>(undefined);

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
						type="time"
						{...methods.register('time')}
					/>
					<Calendar
						mode="single"
						selected={date}
						onSelect={setDate}
						{...methods.register('date', { valueAsDate: true })}
					/>
					<ErrorMessage errors={methods.formState.errors} name="date" />
					<ErrorMessage errors={methods.formState.errors} name="time" />
					<EventInputField
						aria-label="Обложка"
						{...methods.register('coverImage')}
					/>
					<EventInputField
						aria-label="Тип"
						{...methods.register('eventTypeId', { valueAsNumber: true })}
					/>
					<EventInputField
						aria-label="Онлайн"
						type="checkbox"
						{...methods.register('isOnline')}
					/>
					<EventInputField
						aria-label="Бесплатно"
						type="checkbox"
						{...methods.register('isFree', {
							setValueAs: (v) => {
								console.log(v);
								return v;
							},
						})}
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
