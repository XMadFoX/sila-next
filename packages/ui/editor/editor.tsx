import React, { useEffect, useState } from 'react';
import styles from './editor.module.scss';
import EditorJS from '@editorjs/editorjs';
import DragDrop from 'editorjs-drag-drop';

import { userPlugins } from './config';

export function EditorContainer() {
	const holderId = React.useId();
	const [editor, setEditor] = useState<EditorJS | null>(null);

	useEffect(() => {
		setEditor((prevEditor) => {
			if (!prevEditor) {
				const editor = new EditorJS({
					holder: holderId,
					tools: userPlugins,
					onReady: () => {
						const extraDiv = document.getElementById(holderId)?.children;
						extraDiv?.length === 2 && extraDiv[1].remove();
						new DragDrop(editor);
					},
				});
				return editor;
			}
			return null;
		});

		return () => {
			if (editor) {
				editor.destroy();
			}
		};
	}, []);

	return (
		<div className="w-full">
			<div className={styles.editor} id={holderId} />
		</div>
	);
}
