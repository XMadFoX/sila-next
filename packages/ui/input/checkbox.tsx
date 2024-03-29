'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

import { cn } from '../lib/utils';
import { useController } from 'react-hook-form';

const Checkbox = React.forwardRef<
	React.ElementRef<typeof CheckboxPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => {
	const { field } = useController({ name: props.name as string });
	return (
		<CheckboxPrimitive.Root
			ref={ref}
			checked={field.value}
			onCheckedChange={field.onChange}
			className={cn(
				'peer h-6 w-6 shrink-0 rounded-sm border border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary-45  data-[state=checked]:text-white ',
				className
			)}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				className={cn('flex items-center justify-center text-current')}
			>
				<Check className="w-4 h-4" />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	);
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
