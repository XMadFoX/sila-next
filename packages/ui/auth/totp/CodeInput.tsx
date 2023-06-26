import React, { forwardRef } from 'react';
import { InputField } from '../../input';

export const CodeInput = forwardRef<
	HTMLInputElement,
	React.InputHTMLAttributes<HTMLInputElement>
>(function CodeInput(props, ref) {
	return (
		<InputField
			type="number"
			placeholder="000000"
			labelVisible
			aria-label="Код из аутентификатора"
			min={0}
			max={999999}
			ref={ref}
			{...props}
		/>
	);
});

CodeInput.displayName = 'CodeInput';
