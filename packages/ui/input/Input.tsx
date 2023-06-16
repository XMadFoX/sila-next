'use client';

import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { GradientWrapper } from '../general';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	rightItem?: React.ReactNode;
	errors?: {
		[x: string]: any;
	};
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
	({ rightItem, errors, ...props }, ref) => (
		<div className="flex flex-col">
			<label className="invisible w-0 h-0" aria-label={props.name}>
				{props.placeholder}
			</label>
			<GradientWrapper
				className="flex relative flex-col bg-primary"
				rounded="lg"
			>
				<input
					ref={ref}
					className="py-2 px-4 w-full rounded-lg ring transition-all duration-300 outline-none focus:ring-transparent invalid:outline-error invalid:border-error invalid:border ring-dark-grey"
					{...props}
				/>
				{rightItem && <div className="absolute right-2">{rightItem}</div>}
			</GradientWrapper>
			<ErrorMessage
				errors={errors}
				name={props.name!}
				render={(err) => (
					<label aria-label="name" className="text-error">
						{err.message}
					</label>
				)}
			/>
		</div>
	)
);

InputField.displayName = 'InputField';
export { InputField };
