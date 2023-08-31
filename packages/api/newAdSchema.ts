import {
	literal,
	maxLength,
	merge,
	minLength,
	object,
	parse,
	string,
	union,
	url,
} from 'valibot';

const base = object({
	title: string([minLength(3), maxLength(255)]),
	description: string([minLength(3), maxLength(255)]),
});

const event = object({
	type: literal('event'),
	registrationUrl: string([minLength(3), maxLength(255), url()]),
});

const project = object({
	type: literal('project'),
	projectTopicId: string([minLength(3), maxLength(255)]),
});

const online = object({
	isOnline: literal(true),
});

const offline = object({
	isOnline: literal(false),
	country: string([minLength(2), maxLength(255)]),
	city: string([minLength(3), maxLength(255)]),
	address: string([minLength(3), maxLength(255)]),
	maps_link: string([minLength(3), maxLength(255), url()]),
});

// create variations - events/projects, online/offline
const offlineEvent = merge([base, event, offline]);
const onlineEvent = merge([base, event, online]);
const offlineProject = merge([base, project, offline]);
const onlineProject = merge([base, project, online]);

const universal = union([
	offlineEvent,
	onlineEvent,
	offlineProject,
	onlineProject,
]);

// export const _expirementalNewAdSchema = parse(universal, {});
export const _expirementalNewAdSchema = universal;
export { onlineEvent, offlineEvent, onlineProject, offlineProject };
