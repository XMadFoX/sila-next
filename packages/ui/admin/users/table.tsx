'use client';

import { trpc } from '../../lib';
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { userList } from '@sila/api/admin/users';

type ArrayElementType<T> = T extends Array<infer U> ? U : never;
type single = ArrayElementType<userList>;
const columnHelper = createColumnHelper<single>();
const columns = [
	columnHelper.accessor('id', {
		cell: (info) => (
			<p className="overflow-x-scroll whitespace-nowrap max-w-[5vw]">
				{info.getValue()}
			</p>
		),
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor('name', {
		cell: (info) => info.getValue(),
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor('roles', {
		cell: (info) => (
			<p className="text-error">{JSON.stringify(info.getValue())}</p>
		),
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor('email', {
		cell: (info) => info.getValue(),
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor('totpEnabled', {
		cell: (info) => info.getValue()?.toLocaleString(),
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor('createdAt', {
		cell: (info) => info.getValue()?.toLocaleString(),
		footer: (info) => info.column.id,
	}),
];
export default function Table() {
	const { data: users } = trpc.users.list.useQuery();

	const table = useReactTable({
		data: users ?? [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	});
	return (
		<>
			<table className="mt-16">
				<thead className="divide-y">
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id} className="divide-x">
							{headerGroup.headers.map((header) => (
								<th key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
										  )}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody className="divide-y">
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id} className="divide-x">
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id} className="p-1">
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
