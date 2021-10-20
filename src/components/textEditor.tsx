import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';
import './textEditor.css';

const TextEditor: React.FC = () => {
	const [ editing, setEditing ] = useState(false);
	
	const Ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const outsideClickListener = (event: MouseEvent) => {
			if (Ref.current?.contains(event.target as Node)) {return};
			
			setEditing(false);
		};

		document.addEventListener('click', outsideClickListener, {capture: true});

		return () => document.removeEventListener('click', outsideClickListener, {capture: true});
	}, []);

	if (editing) {
		return (
			<div className='text-editor'>
				<MDEditor />
			</div>
		);
	};

	return (
		<div ref={Ref} className='text-editor' onClick={() => setEditing(true)}>
			<MDEditor.Markdown source={'# LOL'} />
		</div>
	);
};

export default TextEditor;