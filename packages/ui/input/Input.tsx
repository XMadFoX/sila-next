'use client';

import { ErrorMessage } from '@hookform/error-message';
import { cva } from 'class-variance-authority';
import React from 'react';
import { useController } from 'react-hook-form';
import { GradientWrapper } from '../general';
import { cn } from '../lib/utils';

export interface InputFieldProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	rightItem?: React.ReactNode;
	labelVisible?: boolean;
	errors?: {
		[x: string]: any;
	};
}

function calcilateVariant({
	disabled,
	invalid,
	filled,
}: {
	disabled: boolean;
	invalid: boolean;
	filled: boolean;
}) {
	if (disabled) return 'disabled';
	if (invalid) return 'invalid';
	if (filled) return 'filled';
	return 'default';
}

const wrapper = cva('flex relative flex-col transition-all duration-300', {
	variants: {
		intent: {
			disabled: ['opacity-50 bg-black'],
			default: ['bg-primary peer-disabled:opacity-50'],
			invalid: ['bg-error'],
			filled: ['bg-black focus-within:bg-primary'],
		},
	},
});

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
	({ rightItem, errors, labelVisible, className, ...props }, ref) => {
		const { fieldState, field } = useController({ name: props.name! });
		const variant = calcilateVariant({
			disabled: props?.disabled || false,
			invalid: fieldState.isTouched && fieldState?.error ? true : false,
			filled: field?.value?.length > 0,
		});

		return (
			<div className="flex flex-col">
				<label
					className={labelVisible ? 'mb-1' : 'invisible w-0 h-0'}
					aria-label={props.name}
				>
					{labelVisible ? props['aria-label'] : props.placeholder}
				</label>
				<GradientWrapper className={wrapper({ intent: variant })} rounded="lg">
					<input
						ref={ref}
						className={cn(
							'py-2 px-4 w-full rounded-lg ring transition-all group dark:bg-blac duration-300 appearance-none outline-none focus:ring-transparent ring-dark-grey bg-white',
							field.value?.length > 0 && 'ring-transparent',
							fieldState.isTouched &&
								fieldState?.error &&
								'border-error border',
							className
						)}
						{...props}
					/>
					{rightItem && (
						<div className="flex absolute right-2 items-center">
							{rightItem}
						</div>
					)}
				</GradientWrapper>
				<ErrorMessage
					errors={errors}
					name={props.name!}
					render={(err) => (
						<label htmlFor={props.name} className="text-error">
							{err.message}
						</label>
					)}
				/>
			</div>
		);
	}
);

InputField.displayName = 'InputField';
export { InputField };
