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
	const { updateCell } = useActions();
	
	const markdownWrapperRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const outsideClickListener = (event: MouseEvent) => {
			if (markdownWrapperRef.current && event.target && markdownWrapperRef.current.contains(event.target as Node)) {return};
			
			setEditing(false);
		};

		document.addEventListener('click', outsideClickListener, {capture: true});

		return () => document.removeEventListener('click', outsideClickListener, {capture: true});
	}, []);

	if (editing) {
		return (
			<div ref={markdownWrapperRef} className='text-editor'>
				<MDEditor value={cell.content} onChange={updatedMarkdown => updateCell(cell.id, updatedMarkdown || '')} />
			</div>
		);
	};

	return (
		<div className='text-editor card' onClick={() => setEditing(true)}>
			<div className='card-content'>
				<MDEditor.Markdown source={cell.content || 'Click to Edit'} />
			</div>
		</div>
	);
};

export default TextEditor;