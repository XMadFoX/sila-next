import { trpc } from '../lib';

export function DangerZone({ id }: { id: number }) {
	const { mutate: deleteEvent } = trpc.events.delete.useMutation();

	return (
		<div className="flex flex-col py-4 mt-8 w-full max-w-3xl border-t opacity-25 transition-opacity duration-300 hover:opacity-100 border-t-error">
			<button
				className="py-3 rounded-full border transition-colors duration-300 hover:text-white border-error hover:bg-error"
				onClick={() => deleteEvent(id)}
			>
				Удалить
			</button>
		</div>
	);
}
