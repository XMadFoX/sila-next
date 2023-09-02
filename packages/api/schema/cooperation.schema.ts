import { InferModel, relations } from 'drizzle-orm';
import {
	sqliteTable,
	text,
	integer,
	uniqueIndex,
} from 'drizzle-orm/sqlite-core';
import { baseContent } from './contentBase.schema';
import { createInsertSchema } from 'drizzle-zod';
import { adBase, articleText } from './events.schema';

/**
 * @param {Date} date application deadline
 */
export const projects = sqliteTable('cooperation', {
	...adBase,
	projectTopicId: integer('project_topic_id').references(() => projectTypes.id),
});

export type Project = InferModel<typeof projects>;

export const projectsRelations = relations(projects, ({ one }) => ({
	types: one(projectTypes, {
		fields: [projects.projectTopicId],
		references: [projectTypes.id],
	}),
	text: one(articleText, {
		fields: [projects.id],
		references: [articleText.articleId],
	}),
	base: one(baseContent, {
		fields: [projects.baseId],
		references: [baseContent.id],
	}),
}));

export const projectTypes = sqliteTable(
	'project_types',
	{
		id: integer('id').primaryKey().notNull(),
		name: text('name', { length: 64 }).notNull(),
	},
	(table) => ({
		id: uniqueIndex('id').on(table.id),
	})
);

export type ProjectType = InferModel<typeof projectTypes>;
export const insertProjectTypesSchema = createInsertSchema(projectTypes);
