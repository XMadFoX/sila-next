import { z } from 'zod';

const baseSchema = z.object({
	title: z.string().min(3).max(64),
	description: z.string().min(3).max(255),
	// later image id on CF images
	coverImage: z.string().min(3).max(255).url(),
	duration: z.number().int().min(0).optional(),
	isFree: z.boolean().optional(),
	registrationUrl: z.union([
		z.string().max(512).url().optional(),
		z.literal(''),
	]),
	eventTypeId: z.number().int().optional(),
	date: z.date().min(new Date()),
	time: z
		.string()
		.min(5, { message: 'Обязательное поле' })
		.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
			message: 'Неправильный формат',
		}),
	// oraganizationId: z.number().int().optional(),
});

const onlineCond = {
	isOnline: z.literal(true),
};
const offlineCond = {
	isOnline: z.literal(false),
	country: z.string().length(2).max(255),
	city: z.string().min(3).max(255),
	address: z.string().min(3).max(255),
	maps_link: z.string().min(3).max(255).url(),
};
export const newEventSchema = z.discriminatedUnion('isOnline', [
	baseSchema.extend({ ...onlineCond }),
	baseSchema.extend({ ...offlineCond }),
]);

const apiSchema = baseSchema.extend({
	timestamp: z.date().min(new Date()),
});
export const newEventSchemaApi = z.discriminatedUnion('isOnline', [
	apiSchema.extend({ ...onlineCond }),
	apiSchema.extend({ ...offlineCond }),
]);
