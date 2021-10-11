import { useRef } from 'react';
import Editor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

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
	};

	const onFormatClick = () => {
		const unformattedCode = editorRef.current.getModel().getValue();
		const formattedCode = prettier.format(unformattedCode, {
			parser: 'babel',
			plugins: [parser],
			useTabs: true,
			singleQuote: true,
			semi: true
		});
		
		editorRef.current.setValue(formattedCode);
	};

	return (
		<>
		<button onClick={onFormatClick}>Format</button>
		<Editor
			editorDidMount={onEditorDidMount}
			value={initialValue}
			height='500px'
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
		</>
	);
};

export default CodeEditor;