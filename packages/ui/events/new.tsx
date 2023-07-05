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
import { Popover, PopoverContent, PopoverTrigger } from '../general/Popover';
import { cn } from '../lib/utils';
import { CalendarIcon } from 'lucide-react';
import { addMinutes, format } from 'date-fns';
import { FormControl, FormField, FormItem } from '../input/form';
import { Checkbox } from '../form/checkbox';

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
	time: z
		.string()
		.min(5, { message: 'Обязательное поле' })
		.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
			message: 'Неправильный формат',
		}),
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

						const [hours, minutes] = d.time.split(':');
						const combinedDateTime = addMinutes(
							new Date(d.date.toUTCString()),
							parseInt(hours) * 60 + parseInt(minutes)
						);
						// convert to UTC
						console.log(combinedDateTime.getTime());

						// send
						const payload = { ...d, date: combinedDateTime.getTime() };
					})}
					className="flex flex-col gap-2"
				>
					<EventInputField
						aria-label="Заголовок"
						{...methods.register('title')}
					/>
					<EventInputField
						aria-label="Описание"
						{...methods.register('description')}
					/>

					<FormField
						control={methods.control}
						name="date"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<Popover>
									<label className="mb-0" htmlFor="date">
										Дата проведения
									</label>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												intent={'clear'}
												size={null}
												className={cn(
													'w-full px-3 text-left font-normal flex items-center border border-dark-grey rounded-lg py-2',
													!field.value && 'text-muted-foreground'
												)}
											>
												{field.value ? (
													format(field.value, 'PPP')
												) : (
													<span>Выберите дату</span>
												)}
												<CalendarIcon className="ml-auto w-4 h-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="p-0 w-auto" align="start">
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) => date < new Date()}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<ErrorMessage
									errors={methods.formState.errors}
									name="date"
									render={(err) => (
										<label className="text-error">{err.message}</label>
									)}
								/>
							</FormItem>
						)}
					/>
					<EventInputField
						aria-label="Время начала"
						type="time"
						{...methods.register('time')}
					/>
					<EventInputField
						aria-label="Обложка"
						{...methods.register('coverImage')}
					/>
					<EventInputField
						aria-label="Тип"
						{...methods.register('eventTypeId', { valueAsNumber: true })}
					/>
					<div className="flex gap-2">
						<Checkbox id="isOnline" {...methods.register('isOnline')} />
						<label htmlFor="isOnline" className="mr-2">
							Онлайн
						</label>
						<Checkbox
							{...methods.register('isFree', {
								setValueAs: (v) => {
									console.log(v);
									return v;
								},
							})}
						/>
						<label htmlFor="isFree">Бесплатно</label>
					</div>
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
