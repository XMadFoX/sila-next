import { Heading, Section, Text } from '@jsx-email/all';
import { Template as MainTemplate } from './MainTemplate';

export const TemplateName = 'NewLoginEmail';

export const Template = ({
	timestamp,
	ip,
	browser,
	os,
	url,
}: {
	timestamp: string;
	ip: string;
	browser: string;
	os: string;
	url: string;
}) => {
	return (
		<MainTemplate
			title="Новый вход в аккаунт"
			text={`В Ваш аккаунт выполнен вход. Если это были не вы, мы рекомендуем Вам сменить пароль КАК МОЖНО БЫСТРЕЕ чтобы защитить Ваш аккаунт. Сменив пароль, все устройства выйдут с этого аккаунта. `}
			actionText="Личный кабинет"
			actionUrl={url}
			body={
				<>
					<Section className="text-start">
						<Heading as="h3">Информация о входе</Heading>
						<Text>Время: {timestamp} по UTC</Text>
						<Text>IP: {ip}</Text>
						<Text>Браузер: {browser}</Text>
						<Text>ОС: {os}</Text>
					</Section>
				</>
			}
		/>
	);
};
