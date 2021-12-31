import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Cell } from '../redux';
import { useActions } from '../hooks/useActions';
import './textEditor.css';

interface TextEditorProps {
	cell: Cell;
};

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
	const [ editing, setEditing ] = useState(false);
	const { upDateCell } = useActions();

	const markDownWrapperReference = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const outSideClickHandler = (event: MouseEvent) => {
			if (markDownWrapperReference.current && event.target && markDownWrapperReference.current.contains(event.target as Node)) return;

			setEditing(false);
		};

		document.addEventListener('click', outSideClickHandler, {capture: true});

		return () => {document.removeEventListener('click', outSideClickHandler, {capture: true})};
	}, []);

	if (editing) {
		return (
			<div ref={markDownWrapperReference} className='text-editor'>
				<MDEditor value={cell.conTent} onChange={updatedMarkdown => upDateCell(cell.ID, updatedMarkdown || '')} />
			</div>
		);
	};

	return (
		<div className='text-editor card' onClick={() => {setEditing(true)}}>
			<div className='card-content'>
				<MDEditor.Markdown source={cell.conTent || 'Click to Edit'} />
			</div>
		</div>
	);
};

export default TextEditor;