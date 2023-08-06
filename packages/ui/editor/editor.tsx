import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useState,
} from 'react';
import styles from './editor.module.scss';
import EditorJS from '@editorjs/editorjs';
import { userPlugins } from './config';
import DragDrop from 'editorjs-drag-drop';

export const EditorContainer = forwardRef((props, ref) => {
	const holderId = React.useId();
	const [editor, setEditor] = useState<EditorJS | null>(null);
	const save = () => {
		editor
			?.save()
			.then((outputData) => {
				console.log('Article data11: ', outputData);
			})
			.catch((error) => {
				console.log('Saving failed: ', error);
			});
	};

	useImperativeHandle(ref, () => {
		return editor;
	});

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
					data: {
						blocks: [
							{
								id: 'Gjq-FU6zUv',
								type: 'header',
								data: {
									text: 'Заголвок статьи',
									level: 2,
								},
							},
							{
								id: 'SGe6wcZQO6',
								type: 'paragraph',
								data: {
									text: 'Текст',
								},
							},
						],
						version: '2.27.2',
					},
				});
				return editor;
			}
			return prevEditor;
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
			<button onClick={save} type="button">
				Save
			</button>
		</div>
	);
});

EditorContainer.displayName = 'EditorContainer';
