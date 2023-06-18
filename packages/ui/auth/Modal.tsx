'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import { Auth } from './Auth';

const Modal = () => {
	const router = useRouter();

	return (
		<Dialog.Root
			defaultOpen
			onOpenChange={(state) => {
				// openned => true, closed => false
				if (state) return;
				router.back();
			}}
		>
			<Dialog.Portal>
				<Dialog.Overlay className="bg-[#000000aa] backdrop-opacity-20 data-[state=open]:animate-overlayShow fixed inset-0" />
				<Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
					<Auth />
					<Dialog.Close asChild>
						<button
							className="inline-flex absolute justify-center items-center rounded-full appearance-none focus:outline-none text-violet11 top-[10px] right-[10px] h-[25px] w-[25px] hover:bg-violet4 focus:shadow-violet7 focus:shadow-[0_0_0_2px]"
							aria-label="Close"
						>
							Закрыть
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export { Modal };
