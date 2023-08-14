const ErrorMessages = {
	auth: {
		totp: {
			invalidCode: 'Неверный код',
			alreadyEnabled: 'TOTP уже включен',
			notEnabled: 'TOTP не включен',
			notGeneratedYet: 'TOTP токен еще не сгенерирован',
			required: 'Требуется 2FA',
		},
	},
};
Object.freeze(ErrorMessages);
export default ErrorMessages;
