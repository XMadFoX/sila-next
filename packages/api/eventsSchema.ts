import { z } from 'zod';

const baseSchema = z.object({
	title: z.string().min(3).max(64),
	description: z.string().min(3).max(255),
	// later image id on CF images
	coverImage: z.string().min(3).max(255).url(),
	date: z.date().min(new Date()),
	text: z.any(),
	time: z
		.string()
		.min(5, { message: 'Обязательное поле' })
		.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
			message: 'Неправильный формат',
		}),
	contacts: z
		.object({
			phone: z
				.literal('')
				.or(z.string().regex(/^\+[0-9]{10,16}$/))
				.or(z.undefined()),
			email: z
				.literal('')
				.or(z.string().email().min(3).max(255))
				.or(z.undefined()),
			website: z
				.literal('')
				.or(z.string().url().min(3).max(255))
				.or(z.undefined()),
		})
		.refine(
			(v) => {
				// at least one field should be filled (and not empty string)
				return Object.values(v).some((v) => v !== '');
			},
			{ message: 'Обязательно заполните хотя бы одно поле' }
		)
		.transform((v) => {
			// remove empty strings & do "as" to Partial without hardcoding
			return Object.fromEntries(
				Object.entries(v).filter(([_, v]) => v !== '')
			) as Partial<typeof v>;
		}),
	// oraganizationId: z.number().int().optional(),
});

const eventBaseSchema = baseSchema.extend({
	registrationUrl: z.union([
		z.string().max(512).url().optional(),
		z.literal(''),
	]),
	eventTypeId: z.number().int().optional(),
	entryType: z.enum(['free', 'paid', 'donation']),
	// duration: z.number().int().min(0).optional(),
});

const projectBaseSchema = baseSchema.extend({
	kind: z.literal('project'),
	title: z.string().min(10).max(64),
	projectTopicId: z.number().int().optional(),
});

const onlineCond = {
	isOnline: z.literal(true),
};
const offlineCond = {
	isOnline: z.literal(false),
	country: z.string().length(2),
	city: z.string().min(3).max(255),
	address: z.string().min(3).max(255),
	maps_link: z.string().min(3).max(255).url(),
};

export const newProjectSchema = z.discriminatedUnion('isOnline', [
	projectBaseSchema.extend({ ...onlineCond }),
	projectBaseSchema.extend({ ...offlineCond }),
]);

export const newEventSchema = z.discriminatedUnion('isOnline', [
	eventBaseSchema.extend({ ...onlineCond }),
	eventBaseSchema.extend({ ...offlineCond }),
]);

const apiSchema = eventBaseSchema.extend({
	kind: z.literal('event'),
	timestamp: z.date().min(new Date()),
	articleData: z.any(),
});
export const newEventSchemaApi = z.discriminatedUnion('isOnline', [
	apiSchema.extend({ ...onlineCond }),
	apiSchema.extend({ ...offlineCond }),
]);
