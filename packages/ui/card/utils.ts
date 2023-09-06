import entryTypes from '@sila/api/ads/entryTypes';

export const getBadges = ({
	entryType,
	isOnline,
}: {
	entryType: keyof typeof entryTypes;
	isOnline: boolean;
}) => {
	const badges: string[] = [];
	badges.push(entryTypes[entryType]);
	if (isOnline) badges.push('Онлайн');
	return badges;
};
