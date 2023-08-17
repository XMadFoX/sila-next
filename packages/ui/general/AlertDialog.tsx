import React from 'react';
import * as RadixAlertDialog from '@radix-ui/react-alert-dialog';

export function AlertDialog({
	title,
	description,
	trigger,
	actionText,
	actionCallback,
}: {
	title: string;
	description: string;
	trigger: React.ReactNode;
	actionText: string;
	actionCallback: () => void;
}) {
	return (
		<RadixAlertDialog.Root>
			<RadixAlertDialog.Trigger asChild>{trigger}</RadixAlertDialog.Trigger>
			<RadixAlertDialog.Portal>
				<RadixAlertDialog.Overlay className="bg-[#000000aa] data-[state=open]:animate-overlayShow fixed inset-0" />
				<RadixAlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
					<RadixAlertDialog.Title className="m-0 font-medium text-mauve12 text-[17px]">
						{title}
					</RadixAlertDialog.Title>
					<RadixAlertDialog.Description className="mt-4 mb-5 leading-normal text-mauve11 text-[15px]">
						{description}
					</RadixAlertDialog.Description>
					<div className="flex justify-end gap-[25px]">
						<RadixAlertDialog.Cancel asChild>
							<button className="inline-flex justify-center items-center font-medium leading-none outline-none text-mauve11 bg-mauve4 h-[35px] rounded-[4px] px-[15px] hover:bg-mauve5 focus:shadow-mauve7 focus:shadow-[0_0_0_2px]">
								Отмена
							</button>
						</RadixAlertDialog.Cancel>
						<RadixAlertDialog.Action asChild>
							<button
								onClick={actionCallback}
								className="inline-flex justify-center items-center font-medium leading-none outline-none text-red11 bg-red4 h-[35px] rounded-[4px] px-[15px] hover:bg-red5 focus:shadow-red7 focus:shadow-[0_0_0_2px]"
							>
								{actionText}
							</button>
						</RadixAlertDialog.Action>
					</div>
				</RadixAlertDialog.Content>
			</RadixAlertDialog.Portal>
		</RadixAlertDialog.Root>
	);
}
