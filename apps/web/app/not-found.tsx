import { Button } from 'ui';

export default function NotFound() {
	return (
		<div className="flex flex-col flex-1 justify-center items-center my-0 min-h-full text-center">
			<h1 className="mb-4 text-4xl font-bold">Страница не найдена</h1>
			<Button href="/" className="font-bold hover:shadow-2xl">
				На главную
			</Button>
		</div>
	);
}
