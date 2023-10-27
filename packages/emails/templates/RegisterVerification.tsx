import { Template as MainTemplate } from './MainTemplate';

export const TemplateName = 'RegisterVerification';

export const Template = ({ url }: { url: string }) => {
	return (
		<MainTemplate
			title="Подтверждение регистрации"
			subtitle={`Для завершения регистрации перейдите по сылке ниже`}
			text=""
			actionText="Подтвердить"
			actionUrl={url}
		/>
	);
};
