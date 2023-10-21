import {
	Body,
	Button,
	Container,
	Heading,
	Html,
	Section,
	Tailwind,
	Text,
} from '@jsx-email/all';

export const TemplateName = 'MainTemplate';

export const Template = (props: {
	title: string;
	subtitle?: string;
	text: string;
	actionText: string;
	actionUrl: string;
	body?: JSX.Element;
}) => {
	const { title, subtitle, text, actionText, actionUrl, body } =
		Object.values(props).length >= 4
			? props
			: {
					title: 'Title',
					subtitle: 'Subtitle',
					text: 'Long text',
					actionText: 'Action',
					actionUrl: 'https://example.com',
					body: undefined,
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
					<Container>
						<Text className="text-start">{text}</Text>
					</Container>
					{body && <Container>{body}</Container>}
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
