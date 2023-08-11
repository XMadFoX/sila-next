'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Plus } from 'lucide-react';

import { cn } from '../../lib/utils';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
	<AccordionPrimitive.Item
		ref={ref}
		className={cn(
			'border-b border-b-black border-solid border-opacity-40',
			className
		)}
		{...props}
	/>
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Header className="flex">
		<AccordionPrimitive.Trigger
			ref={ref}
			className={cn(
				'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180 text-left',
				className
			)}
			{...props}
		>
			{children}
			{/* TODO: добавить минус */}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				className="h-4 w-4 shrink-0 transition-transform duration-200"
			>
				<path
					d="M12.1091 1.99999L12.0919 21.799M2.20099 11.8909L22 11.9081"
					stroke="url(#paint0_linear_879_6408)"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_879_6408"
						x1="5.61886"
						y1="20.5085"
						x2="18.815"
						y2="7.35898"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#2E89DC" />
						<stop offset="0.427565" stop-color="#4361EE" />
						<stop offset="0.967556" stop-color="#FB6F92" />
					</linearGradient>
				</defs>
			</svg>
		</AccordionPrimitive.Trigger>
	</AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Content
		ref={ref}
		className={cn(
			'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
			className
		)}
		{...props}
	>
		<div className="pb-4 pt-0">{children}</div>
	</AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
