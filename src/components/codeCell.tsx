import { useState, useEffect } from 'react';
import bundler from '../bundler';
import Resizable from './resizable';
import CodeEditor from './codeEditor';
import Preview from './preview';
import { Cell } from '../redux';
import { useActions } from '../hooks/useActions';

interface CodeCellProps {
	cell: Cell;
};

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
	const [ bundledCode, setBundledCode ] = useState('');
	const [ error, setError ] = useState('');
	const { updateCell } = useActions();

	useEffect(() => {
		const bundleTimer = setTimeout(async () => {
			const bundle = await bundler(cell.content);
			setBundledCode(bundle!.code);
			setError(bundle!.error);
		}, 1000);

		return () => clearTimeout(bundleTimer);
	}, [cell.content]);

	return (
		<Resizable direction='vertical'>
			<div style={{display: 'flex', flexDirection: 'row', height: '100%'}}>
				<Resizable direction='horizontal'>
					<CodeEditor
						initialValue={cell.content}
						onChange={value => updateCell(cell.id, value)}
					/>
				</Resizable>
				<Preview code={bundledCode} error={error} />
			</div>
		</Resizable>
	);
};

export default CodeCell;