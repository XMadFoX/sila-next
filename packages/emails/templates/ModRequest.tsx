import { Text } from '@jsx-email/all';
import { Template as MainTemplate } from './MainTemplate';

export const TemplateName = 'ModRequest';

export const Template = ({
	timestamp,
	title,
	username,
	url,
}: {
	timestamp: Date;
	title: string;
	username: string;
	url: string;
}) => {
	return (
		<MainTemplate
			title={`Запрос на публикацию ${title}`}
			text={`Запрос на публикацию ${title} от ${username}`}
			actionText="Открыть"
			actionUrl={url}
			time={timestamp}
		/>
	);
};
