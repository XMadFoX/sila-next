import { Heading, Text } from '@jsx-email/all';
import { Template as MainTemplate } from './MainTemplate';

export const TemplateName = 'Published';

export const Template = ({
	timestamp,
	title,
	url,
}: {
	timestamp: Date;
	title: string;
	url: string;
}) => {
	return (
		<MainTemplate
			title={`Опубликовано объявление "${title}"`}
			text=""
			actionText="Открыть"
			actionUrl={url}
			time={timestamp}
		/>
	);
};
