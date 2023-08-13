'use client';

import React from 'react';
import { InputField } from '../../input';

export interface CodeInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const CodeInput = React.forwardRef<HTMLInputElement, CodeInputProps>(
	(props, ref) => {
		return (
			<InputField
				type="number"
				placeholder="000000"
				labelVisible
				aria-label="Код из аутентификатора"
				min={0}
				max={999999}
				{...props}
				ref={ref}
			/>
		);
	}
);

CodeInput.displayName = 'CodeInput';
export { CodeInput };
