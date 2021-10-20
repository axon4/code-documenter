import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';
import './textEditor.css';

const TextEditor: React.FC = () => {
	const [ editing, setEditing ] = useState(false);
	const [ markdown, setMarkdown ] = useState('# Heading');
	
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
				<MDEditor value={markdown} onChange={updatedMarkdown => setMarkdown(updatedMarkdown || '')} />
			</div>
		);
	};

	return (
		<div className='text-editor card' onClick={() => setEditing(true)}>
			<div className='card-content'>
				<MDEditor.Markdown source={markdown} />
			</div>
		</div>
	);
};

export default TextEditor;