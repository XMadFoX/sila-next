import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useState,
} from 'react';
import styles from './editor.module.scss';
import EditorJS from '@editorjs/editorjs';
import { basePlugins, userPlugins } from './config';
import DragDrop from 'editorjs-drag-drop';

interface EditorProps {
	data?: any;
	restricted?: true;
}

export const EditorContainer = forwardRef((props: EditorProps, ref) => {
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
					tools: props.restricted ? basePlugins : userPlugins,
					onReady: () => {
						const extraDiv = document.getElementById(holderId)?.children;
						extraDiv?.length === 2 && extraDiv[1].remove();
						new DragDrop(editor);
					},
					data: props?.data ?? {
						blocks: [
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
		</div>
	);
});

EditorContainer.displayName = 'EditorContainer';
