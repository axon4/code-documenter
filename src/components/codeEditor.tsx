import { useRef } from 'react';
import Editor, { EditorDidMount } from '@monaco-editor/react';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import './codeEditor.css';
import './codeEditorHighlighting.css';

interface CodeEditorProps {
	initialValue: string;
	onChange(value: string): void;
};

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
	const editorRef = useRef<any>();

	const onEditorDidMount: EditorDidMount = (getValue, editor) => {
		editorRef.current = editor;

		editor.onDidChangeModelContent(() => onChange(getValue()));
		editor.getModel()?.updateOptions({tabSize: 4});

		// @ts-ignore
		const highlighter = new Highlighter(window.monaco, codeShift, editor);
		highlighter.highLightOnDidChangeModelContent(
			() => {},
			() => {},
			undefined,
			() => {}
		);
	};

	const onFormatClick = () => {
		const unformattedCode = editorRef.current.getModel().getValue();
		const formattedCode = prettier.format(unformattedCode, {
			parser: 'babel',
			plugins: [parser],
			useTabs: true,
			singleQuote: true,
			semi: true
		}).replace(/\n$/, '');
		
		editorRef.current.setValue(formattedCode);
	};

	return (
		<div className='editor-container'>
			<button className='button button-format is-primary is-small' onClick={onFormatClick}>Format</button>
			<Editor
				editorDidMount={onEditorDidMount}
				value={initialValue}
				height='100%'
				theme='dark'
				language='javascript'
				options={{
					wordWrap: 'on',
					minimap: {enabled: false},
					showUnused: false,
					folding: false,
					lineNumbersMinChars: 3,
					fontSize: 16,
					scrollBeyondLastLine: false,
					automaticLayout: true
				}}
			/>
		</div>
	);
};

export default CodeEditor;