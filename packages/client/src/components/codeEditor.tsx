import { useRef } from 'react';
import Editor, { EditorDidMount } from '@monaco-editor/react';
import HighLighter from 'monaco-jsx-highlighter';
import codeShift from 'jscodeshift';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import './codeEditorHighLight.css';
import './codeEditor.css';

interface CodeEditorProps {
	initialValue: string;
	onChange(value: string): void;
};

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
	const editorReference = useRef<any>();

	const onEditorDidMount: EditorDidMount = (getValue, editor) => {
		editorReference.current = editor;

		editor.onDidChangeModelContent(() => {onChange(getValue())});
		editor.getModel()?.updateOptions({tabSize: 4});

		// @ts-ignore
		const highLighter = new HighLighter(window.monaco, codeShift, editor);

		highLighter.highLightOnDidChangeModelContent(() => {}, () => {}, undefined, () => {});
	};

	const onForMatClick = () => {
		const unForMattedCode = editorReference.current.getModel().getValue();
		const forMattedCode = prettier.format(unForMattedCode, {
			parser: 'babel',
			plugins: [parser],
			useTabs: true,
			singleQuote: true,
			semi: true
		}).replace(/\n$/, '');

		editorReference.current.setValue(forMattedCode);
	};

	return (
		<div className='editor-container'>
			<button className='button button-format is-primary is-small' onClick={onForMatClick}>
				ForMat
			</button>
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