import { Body, Button, Heading, Html, Tailwind, Text } from '@jsx-email/all';

export const TemplateName = 'MainTemplate';

export const Template = (props: {
	title: string;
	subtitle: string;
	text: string;
	actionText: string;
	actionUrl: string;
}) => {
	const { title, subtitle, text, actionText, actionUrl } =
		Object.values(props).length === 5
			? props
			: {
					title: 'Title',
					subtitle: 'Subtitle',
					text: 'Long text',
					actionText: 'Action',
					actionUrl: 'https://example.com',
			  };
	return (
		<Html lang="ru">
			<Tailwind
				config={{
					theme: {
						extend: {
							colors: {},
						},
					},
				}}
			>
				<Body className="text-center">
					<Heading as="h1">{title}</Heading>
					<Heading as="h2">{subtitle}</Heading>
					<Text>{text}</Text>
					<Button
						href={actionUrl}
						className="p-4 rounded-xl text-white"
						style={{
							backgroundImage:
								'linear-gradient(90deg, #2e89dc, #4361ee, #fb6f92)',
						}}
					>
						{actionText}
					</Button>
				</Body>
			</Tailwind>
		</Html>
	);
};
