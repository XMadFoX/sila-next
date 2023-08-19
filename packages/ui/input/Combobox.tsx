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
import { ScrollArea } from '../general/ScrollArea';

const id = (splitChar: string | undefined, value: string) =>
	splitChar ? value.split(splitChar)[0] : value;

export function Combobox({
	label,
	name,
	placeholder,
	searchText,
	noResultsText,
	formDescription,
	options,
	form,
	splitChar,
	useLabelAsValue = false,
}: {
	label: string;
	name: string;
	placeholder: string;
	searchText: string;
	noResultsText: string;
	formDescription?: string;
	options: { label: string; value: any }[];
	form: any;
	splitChar?: string;
	useLabelAsValue?: boolean;
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
										? options.find(
												// some options can have original id as number
												(option) => id(splitChar, option.value) == field.value
										  )?.label
										: placeholder}
									<ChevronsUpDown className="ml-2 w-4 h-4 opacity-50 shrink-0" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className="overflow-y-scroll p-0 w-full bg-white">
							<Command
								filter={(value, search) => {
									if (value.includes(search.toLowerCase())) {
										return 1;
									}
									return 0;
								}}
								className="overflow-y-scroll"
							>
								<CommandInput placeholder={searchText} />
								<CommandEmpty>{noResultsText}</CommandEmpty>
								<CommandGroup>
									<ScrollArea className="h-64">
										{options.map((option) => (
											<CommandItem
												value={option.value}
												key={option.value}
												className="focus-within:text-error"
												onSelect={(value) => {
													form.setValue(
														name,
														useLabelAsValue
															? option.label
															: splitChar
															? value.split(splitChar)[0]
															: value
													);
												}}
											>
												<Check
													className={cn(
														'mr-2 h-4 w-4 transition-opacity duration-300',
														id(splitChar, option.value) === field.value
															? 'opacity-100'
															: 'opacity-0'
													)}
												/>
												{option.label}
											</CommandItem>
										))}
									</ScrollArea>
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
