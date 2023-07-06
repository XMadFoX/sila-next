'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '../general/Button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from './command';
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './form';
import { Popover, PopoverContent, PopoverTrigger } from '../general/Popover';

export function Combobox({
	label,
	name,
	placeholder,
	searchText,
	noResultsText,
	formDescription,
	options,
	form,
}: {
	label: string;
	name: string;
	placeholder: string;
	searchText: string;
	noResultsText: string;
	formDescription?: string;
	options: { label: string; value: any }[];
	form: any;
}) {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem className="flex flex-col">
					<FormLabel className="text-base font-normal">{label}</FormLabel>
					<Popover>
						<PopoverTrigger asChild>
							<FormControl>
								<Button
									intent="clear"
									role="combobox"
									size={null}
									className={cn(
										'w-full justify-between flex outline outline-1 outline-dark-grey rounded-lg py-2 px-2 font-normal items-center ring-blue ring-offset-2',
										!field.value && 'text-muted-foreground'
									)}
								>
									{field.value
										? options.find((option) => option.value === field.value)
												?.label
										: placeholder}
									<ChevronsUpDown className="ml-2 w-4 h-4 opacity-50 shrink-0" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className="p-0 w-full bg-white">
							<Command>
								<CommandInput placeholder={searchText} />
								<CommandEmpty>{noResultsText}</CommandEmpty>
								<CommandGroup>
									{options.map((option) => (
										<CommandItem
											value={option.value}
											key={option.value}
											onSelect={(value) => {
												form.setValue(name, value);
											}}
										>
											<Check
												className={cn(
													'mr-2 h-4 w-4',
													option.value === field.value
														? 'opacity-100'
														: 'opacity-0'
												)}
											/>
											{option.label}
										</CommandItem>
									))}
								</CommandGroup>
							</Command>
						</PopoverContent>
					</Popover>
					{formDescription && (
						<FormDescription>{formDescription}</FormDescription>
					)}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
