'use client';

import React from 'react';
import { InputField, cn } from 'ui';
import { NewEvent } from 'ui/events';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

type Types = 'events' | 'cooperation';

export default function NewPost() {
	const [type, setType] = React.useState<Types>('events');

	return (
		<div className="-mt-5">
			<form onSubmit={(e) => e.preventDefault()}>
				<legend>Выберите тип объявления</legend>
				<div className="flex gap-4 items-center">
					<Select
						title="Культурные мероприятия"
						value="events"
						active={type}
						setType={setType}
					/>
					<Select
						title="Деловое сотрудничество"
						value="cooperation"
						active={type}
						setType={setType}
					/>
				</div>
				<NewEvent type={type} />
			</form>
		</div>
	);
}

const Select = ({
	title,
	value,
	active,
	setType,
}: {
	title: string;
	value: Types;
	active: Types;
	setType: (value: Types) => void;
}) => {
	return (
		<>
			<label className="flex items-center">
				<input
					name="type"
					value={value}
					onChange={() => setType(value)}
					className="appearance-none"
					type="radio"
				/>
				<CheckboxPrimitive.Root
					// ref={checkBoxRef}
					checked={active === value}
					onCheckedChange={() => setType(value)}
					className={cn(
						'h-6 mr-2 w-6 shrink-0 rounded-sm border border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary-45  data-[state=checked]:text-white '
						// className
					)}
				>
					<CheckboxPrimitive.Indicator
						className={cn('flex items-center justify-center text-current')}
					>
						<Check className="w-4 h-4" />
					</CheckboxPrimitive.Indicator>
				</CheckboxPrimitive.Root>
				{title}
			</label>
		</>
	);
};
