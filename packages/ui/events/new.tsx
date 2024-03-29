'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import {
	FormProvider,
	useForm,
	useFormContext,
	useWatch,
} from 'react-hook-form';
import { InputField, InputFieldProps } from '../input';
import { z } from 'zod';
import { Button } from '../general';
import { Calendar } from '../input/Calendar';
import { ErrorMessage } from '@hookform/error-message';
import { Popover, PopoverContent, PopoverTrigger } from '../general/Popover';
import { cn } from '../lib/utils';
import { CalendarIcon } from 'lucide-react';
import { addMinutes, format } from 'date-fns';
import { FormControl, FormField, FormItem, FormLabel } from '../input/form';
import { Checkbox } from '../input/checkbox';
import { Combobox } from '../input/Combobox';
import countries from '@sila/api/countries.json';
import cities from '@sila/api/clientCities25.json';
import { EditorContainer } from '../editor/editor';
import clsx from 'clsx';
import { newEventSchema, newProjectSchema } from '@sila/api/ads/eventsSchema';
import { trpc } from '../lib';
import { useRouter } from 'next/navigation';
import EditorJS from '@editorjs/editorjs';
import { toast } from 'react-toastify';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../input/select';
import { linkMap } from '../card';

export function NewEvent({
	kind = 'event',
	upd,
}: {
	kind?: 'event' | 'project';
	upd?: {
		id: number;
		values: any;
	};
}) {
	const methods = useForm<
		z.infer<typeof newEventSchema> | z.infer<typeof newProjectSchema>
	>({
		resolver:
			kind === 'event'
				? // @ts-ignore: TS2589
				  zodResolver(newEventSchema)
				: // @ts-ignore
				  zodResolver(newProjectSchema),
		defaultValues: async () => {
			if (upd?.values) return upd.values;
			const raw = localStorage.getItem('newEvent');
			if (!raw) return {};
			const data = JSON.parse(raw);
			delete data.date;
			return data as any;
		},
	});
	const { handleSubmit } = methods;
	const {
		mutate,
		data: insertedId,
		isLoading,
		isSuccess,
		error,
	} = trpc.events.create.useMutation();

	const {
		mutate: saveChanges,
		isLoading: updIsLoading,
		error: updError,
	} = trpc.events.edit.useMutation({
		onSuccess: () => {
			toast.success('Мероприятие успешно обновлено');
		},
	});

	const router = useRouter();
	useEffect(() => {
		if (insertedId) router.push(`/${linkMap[kind]}/${insertedId}`);
	}, [insertedId, router]);

	const editorRef = React.useRef<EditorJS | null>(null);

	const { data: eventTypes } = trpc.events.types.list.useQuery(
		kind === 'project' ? 'project' : undefined
	);

	return (
		<div className="w-full max-w-3xl">
			<FormProvider {...methods}>
				<form
					onInvalid={(e) => {
						console.log(e);
					}}
					onSubmit={handleSubmit(
						async (d) => {
							console.log('valid', d);
							const articleData = await (editorRef?.current as any).save();
							localStorage.setItem('newEvent', JSON.stringify(d));

							const [hours, minutes] = d.time.split(':');
							const combinedDateTime = addMinutes(
								new Date(d.date.toUTCString()),
								parseInt(hours) * 60 + parseInt(minutes)
							);
							// convert to UTC
							console.log(combinedDateTime.getTime());

							// send
							const payload = {
								...d,
								kind: kind,
								articleData,
								description: jsonToText(articleData),
								timestamp: combinedDateTime,
							};

							console.log('payload', payload);
							if (upd?.id) {
								saveChanges({ id: upd.id, data: payload });
							} else {
								mutate(payload);
							}
						},
						async (invalid) => {
							console.log('invalid', invalid);
						}
					)}
					className="flex flex-col gap-2"
				>
					<EventInputField
						aria-label="Заголовок"
						{...methods.register('title')}
					/>
					{/* <EventInputField */}
					{/* 	aria-label="Описание" */}
					{/* 	{...methods.register('description')} */}
					{/* /> */}
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
					<Address />
					<EditorContainer
						ref={editorRef}
						data={upd?.values?.text}
						restricted
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
					{eventTypes && eventTypes?.length > 0 && (
						<Combobox
							{...methods.register(
								kind === 'project' ? 'projectTopicId' : 'eventTypeId'
							)}
							label="Тип"
							placeholder="Выберите тип"
							searchText="Начните вводить"
							noResultsText="Нет результатов"
							formDescription=""
							options={eventTypes.map((c) => ({
								label: c.name,
								value: `${c.id}:${c.name}`,
							}))}
							splitChar=":"
							parse={(v) => parseInt(v)}
							form={methods}
						/>
					)}
					<FormField
						control={methods.control}
						name="entryType"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Тип входа</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
									{...methods.register('entryType')}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Выберите" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="free">Бесплатно</SelectItem>
										<SelectItem value="donation">Пожертвования</SelectItem>
										<SelectItem value="paid">Платно</SelectItem>
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>
					{kind === 'event' && (
						<EventInputField
							aria-label="Ссылка на регистрацию"
							{...methods.register('registrationUrl')}
						/>
					)}
					{/* contacts info */}
					<legend className="text-xl font-bold">Контакты организатора</legend>
					<EventInputField
						aria-label="Телефон"
						{...methods.register('contacts.phone')}
					/>
					<EventInputField
						aria-label="Эл. почта"
						{...methods.register('contacts.email')}
					/>
					<EventInputField
						aria-label="Сайт"
						{...methods.register('contacts.website')}
					/>
					<ErrorMessage
						name="contacts"
						errors={methods.formState.errors}
						render={(err) => (
							<label className="text-error">{err.message}</label>
						)}
					/>
					{(error || updError) && (
						<p className="text-error">{error?.message || updError?.message}</p>
					)}
					<Button
						className="disabled:opacity-50"
						type="submit"
						disabled={isLoading || isSuccess || updIsLoading}
					>
						{upd?.id ? 'Сохранить изменения' : 'Отправить'}
					</Button>
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

const Address = () => {
	const methods = useFormContext();
	const isOnline = useWatch({ name: 'isOnline' });
	return (
		<>
			<div className="flex gap-2">
				<Checkbox id="isOnline" {...methods.register('isOnline')} />
				<label htmlFor="isOnline" className="mr-2">
					Онлайн
				</label>
			</div>
			<div
				className={clsx(
					!isOnline ? 'max-h-screen' : 'max-h-0 opacity-0',
					'transition-all duration-500',
					'flex flex-col gap-1'
				)}
			>
				<Combobox
					label="Страна"
					{...methods.register('country')}
					placeholder="Выберите страну"
					searchText="Начните вводить название страны"
					noResultsText="Нет результатов"
					formDescription=""
					options={countries.map((c) => ({
						label: c.ru,
						value: Object.values(c)
							.map((c) => c.toLowerCase())
							.join(':'),
					}))}
					splitChar=":"
					form={methods}
				/>
				<Combobox
					label="Город"
					{...methods.register('city')}
					placeholder="Выберите город"
					searchText="Начните вводить название города"
					noResultsText="Нет результатов"
					formDescription=""
					options={cities
						.filter((c) => c.a2.toLowerCase() === methods.watch('country'))
						.map((city) => ({
							label: city.ru,
							value: `${city.ru}:${city.en.toLowerCase()}`,
						}))}
					splitChar=":"
					useLabelAsValue
					form={methods}
				/>
				<InputField
					aria-label="Адрес"
					labelVisible
					{...methods.register('address')}
				/>
				<InputField
					aria-label="Ссылка на Гугл карты"
					labelVisible
					{...methods.register('maps_link')}
				/>
			</div>
		</>
	);
};

function jsonToText(json: any) {
	// json blocks with {text: string} to plain text
	const shortDescription = json.blocks.reduce((acc: string, curr: any) => {
		if (['paragraph'].includes(curr.type)) {
			return acc !== '' ? `${acc}. ${curr.data.text}` : curr.data.text;
		}
		return acc;
	}, '');
	// strip html tags
	const stripped = shortDescription.replace(/(<([^>]+)>)/gi, '');
	return stripped.slice(0, 200);
}
