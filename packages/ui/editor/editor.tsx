import React from 'react';
import styles from './editor.module.scss';
import EditorJS from '@editorjs/editorjs';
import DragDrop from 'editorjs-drag-drop';

import { userPlugins } from './config';

export function EditorContainer() {
	const holderId = React.useId();
	const editor = new EditorJS({
		holder: holderId,
		onReady: () => {
			new DragDrop(editor);
		},
		tools: userPlugins,
	});
	return (
		<div className="w-full">
			<div className={styles.editor} id={holderId}></div>
		</div>
	);
}
