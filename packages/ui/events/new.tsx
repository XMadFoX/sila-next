import { zodResolver } from '@hookform/resolvers/zod';
import { newEventSchema } from '@sila/api';
import React from 'react';
import { useForm } from 'react-hook-form';
import { InputField } from '../input';
import { z } from 'zod';

export function New() {
	const methods = useForm<z.infer<typeof newEventSchema>>({
		resolver: zodResolver(newEventSchema),
	});
	const { handleSubmit } = methods;

	return (
		<div>
			<form
				onSubmit={handleSubmit(async (d) => {
					console.log(d);
				})}
			>
				<InputField {...methods.register('title')} />
				<InputField {...methods.register('description')} />
				<InputField {...methods.register('timestamp')} />
				<InputField {...methods.register('coverImage')} />
				<InputField {...methods.register('eventTypeId')} />
				<InputField {...methods.register('isOnline')} />
				<InputField {...methods.register('isFree')} />
				<InputField {...methods.register('registrationUrl')} />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
