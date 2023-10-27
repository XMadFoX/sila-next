import { Heading, Section, Text } from '@jsx-email/all';
import { Template as MainTemplate } from './MainTemplate';

export const TemplateName = 'TotpStatusChangedEmail';

export const Template = ({
	to,
	timestamp,
	ip,
	browser,
	os,
	url,
}: {
	to: 'enabled' | 'disabled';
	timestamp: Date;
	ip?: string;
	browser: string;
	os: string;
	url: string;
}) => {
	return (
		<MainTemplate
			title={`${
				to === 'enabled' ? 'Подключена' : 'Отключена'
			} двухфакторная аутентификация`}
			text={
				to === 'enabled'
					? 'Теперь для входа в аккаунт Вам нужно будет вводить код из приложения. Если это сделали не вы, обратитесь в поддержку.'
					: 'Теперь для входа в аккаунт Вам нужно будет вводить только пароль.'
			}
			actionText="Личный кабинет"
			actionUrl={url}
			body={
				<>
					<Section className="text-start">
						<Heading as="h3">Информация</Heading>
						<Text>Время: {timestamp?.toLocaleString('ru-RU')} по UTC</Text>
						<Text>IP: {ip}</Text>
						<Text>Браузер: {browser}</Text>
						<Text>ОС: {os}</Text>
					</Section>
				</>
			}
		/>
	);
};
