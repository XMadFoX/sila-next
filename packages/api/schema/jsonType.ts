import { customType } from 'drizzle-orm/sqlite-core';

export const customJson = <TData>(name: string) =>
	customType<{ data: TData; driverData: string }>({
		dataType() {
			return 'json';
		},
		toDriver(value: TData): string {
			return JSON.stringify(value);
		},
		fromDriver(value: string): any {
			return JSON.parse(value);
		},
	})(name);
