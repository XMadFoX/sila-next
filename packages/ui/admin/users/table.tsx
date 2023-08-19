'use client';

import { trpc } from '../../lib';
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { userList } from '@sila/api/admin/users';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../../general/dropdown-menu';

type ArrayElementType<T> = T extends Array<infer U> ? U : never;
type single = ArrayElementType<userList>;
const columnHelper = createColumnHelper<single>();

export default function Table() {
	const utils = trpc.useContext();
	const { data: users } = trpc.users.list.useQuery();
	const { data: roles } = trpc.roles.list.useQuery();

	const { mutate: addRole } = trpc.users.addRole.useMutation({
		onSuccess: () => {
			utils.users.list.invalidate();
		},
	});

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
			cell: (info) => {
				return (
					<p className="">
						<ul className="flex gap-1">
							{info?.getValue()?.map((role) => (
								<button
									key={role}
									className="hover:text-error"
									title={`Удалить ${role} `}
								>
									{role}
								</button>
							))}
						</ul>
						<DropdownMenu>
							<DropdownMenuTrigger>Добавить</DropdownMenuTrigger>
							<DropdownMenuContent>
								{roles?.map((role) => (
									<DropdownMenuItem
										key={role.id}
										onClick={() =>
											addRole({
												userId: info.table.getRow(info.row.id).getValue('id'),
												roleId: role.id,
											})
										}
									>
										{role.name}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</p>
				);
			},
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
