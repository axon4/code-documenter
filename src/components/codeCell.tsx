import { useEffect } from 'react';
import { Cell } from '../redux';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import Resizable from './resizable';
import CodeEditor from './codeEditor';
import Preview from './preview';
import './codeCell.css';

interface CodeCellProps {
	cell: Cell;
};

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
	const { updateCell, createBundle } = useActions();
	const bundle = useTypedSelector(state => {
		if (state.bundle) {
			return state.bundle[cell.id];
		};
	});

	useEffect(() => {
		if (!bundle) {
			createBundle(cell.id, cell.content);

			return;
		};

		const bundleTimer = setTimeout(async () => {
			createBundle(cell.id, cell.content);
		}, 700);

		return () => clearTimeout(bundleTimer);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createBundle, cell.id, cell.content]);

	return (
		<Resizable direction='vertical'>
			<div style={{
				display: 'flex',
				flexDirection: 'row',
				height: 'calc(100% - 0.5rem)'
			}}>
				<Resizable direction='horizontal'>
					<CodeEditor
						initialValue={cell.content}
						onChange={value => updateCell(cell.id, value)}
					/>
				</Resizable>
				<div className='progress-cover-wrapper'>
				{!bundle || bundle.loading
					? <div className='progress-cover'>
						<progress className='progress is-primary is-small' max='100'>
							LOADING
						</progress>
					</div>
					: <Preview code={bundle.code} error={bundle.error} />
				}
				</div>
			</div>
		</Resizable>
	);
};

export default CodeCell;