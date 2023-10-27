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
	text?: string;
	actionText: string;
	actionUrl: string;
	body?: JSX.Element;
	time?: Date;
}) => {
	const { title, subtitle, text, actionText, actionUrl, body, time } =
		Object.values(props).length >= 3
			? props
			: {
					title: 'Title',
					subtitle: 'Subtitle',
					text: 'Long text',
					actionText: 'Action',
					actionUrl: 'https://example.com',
					body: undefined,
					time: undefined || new Date(),
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
					{text && (
						<Container>
							<Text className="text-start">{text}</Text>
						</Container>
					)}
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
				{time && (
					<Section className="text-center">
						<Text>
							{time?.toLocaleString('ru-RU', {
								hour: 'numeric',
								minute: 'numeric',
								second: 'numeric',
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}{' '}
							по UTC
						</Text>
					</Section>
				)}
			</Tailwind>
		</Html>
	);
};
