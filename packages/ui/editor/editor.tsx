import React from 'react';
import EditorJS from '@editorjs/editorjs';
import List from '@editorjs/list';
import Header from '@editorjs/header';
import Underline from '@editorjs/underline';

export function EditorContainer() {
	const holderId = React.useId();
	const editor = new EditorJS({
		holder: holderId,
		tools: {
			header: {
				class: Header,
				defaultLevel: 2,
				levels: [2, 3, 4],
			},
			List,
			Underline,
		},
	});
	return (
		<div>
			editor<div id={holderId}></div>
		</div>
	);
}
