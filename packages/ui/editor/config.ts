import List from '@editorjs/list';
import Header from '@editorjs/header';
import Underline from '@editorjs/underline';
import Link from '@editorjs/link';
import Marker from '@editorjs/marker';
import CheckList from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import Quote from '@editorjs/quote';
import Table from '@editorjs/table';
import Warning from '@editorjs/warning';
import NestedList from '@editorjs/nested-list';
import TelegramPost from 'editorjs-telegram-post';

export const basePlugins = {
	underline: Underline,
	marker: Marker,
	quote: Quote,
};

export const userPlugins = {
	header: {
		class: Header,
		config: { defaultLevel: 2, levels: [2, 3, 4] },
	},
	...basePlugins,
	list: List,
	link: Link,
	checklist: CheckList,
	delimiter: Delimiter,
	table: Table,
	warning: Warning,
	nestedList: NestedList,
	telegramPost: TelegramPost,
};
