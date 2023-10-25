import { Heading, Text } from '@jsx-email/all';
import { Template as MainTemplate } from './MainTemplate';

export const TemplateName = 'ChangesRequested';

export const Template = ({
	timestamp,
	title,
	message,
	url,
}: {
	timestamp: string;
	title: string;
	message?: string;
	url: string;
}) => {
	return (
		<MainTemplate
			title={`Запрошены изменения для "${title}"`}
			text={`Запрос на изменения "${title}"`}
			actionText="Открыть"
			actionUrl={url}
			body={
				<>
					{message && (
						<>
							<Heading>Сообщение</Heading>
							<Text className="text-start">{message}</Text>
						</>
					)}
				</>
			}
		/>
	);
};
