'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { X } from 'lucide-react';

const Modal = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const [open, setOpen] = useState(true);
	let silent = false;

	const close = () => {
		silent = true;
		setOpen(false);
	};

	const Component = (children: React.ReactNode) =>
		React.cloneElement(children as any, { closeModal: close });

	return (
		<Dialog.Root
			defaultOpen
			open={open}
			onOpenChange={(state) => {
				// openned => true, closed => false
				if (state) return;
				if (silent) {
					silent = false;
					return;
				}
				router.back();
			}}
		>
			<Dialog.Portal>
				<Dialog.Overlay className="bg-[#000000aa] backdrop-opacity-20 data-[state=open]:animate-overlayShow fixed inset-0" />
				<Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white dark:bg-black p-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
					{Component(children)}
					<Dialog.Close asChild>
						<button
							aria-label="Закрыть"
							className="inline-flex absolute top-5 right-5 bottom-auto justify-center items-center"
						>
							<X />
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export { Modal };
