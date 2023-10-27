'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { GradientWrapper } from '../general';

export default function Success() {
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
				<Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] focus:outline-none">
					<GradientWrapper
						className="max-w-lg h-60 text-center text-black bg-primary"
						rounded="xl"
					>
						<span className="flex flex-col justify-center p-4 h-full bg-white rounded-xl items-">
							<Content />
						</span>
					</GradientWrapper>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}

function Content() {
	const type = useSearchParams()?.get('type');

	switch (type) {
		case 'register_email':
			return (
				<div>
					<h1 className="mb-2 text-xl font-medium text-black">
						Спасибо за регистрацию!
					</h1>
					<p>
						Мы отправили вам письмо. Перейдите по ссылке в письме для завершения
						регистрации.
					</p>
				</div>
			);
		default:
			return (
				<div>
					<h1>Вход выполнен</h1>
				</div>
			);
	}
}
