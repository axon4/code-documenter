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
	const cumulativeCode = useTypedSelector(state => {
		const { data, order } = state.cell;
		const orderedCells = order.map(ID => data[ID]);

		const cumulativeCode = [`
			import _React from 'react';
			import _ReactDOM from 'react-dom';

			const show = value => {
				const root = document.getElementById('root');

				if (typeof value === 'object') {
					if (value.$$typeof && value.props) {
						_ReactDOM.render(value, root);
					} else {
						root.innerHTML = JSON.stringify(value);
					}
				} else {
					root.innerHTML = value;
				};
			};
		`];

		for (let orderedCell of orderedCells) {
			if (orderedCell.type === 'code') {
				cumulativeCode.push(orderedCell.content);
			};

			if (orderedCell.id === cell.id) {
				break;
			};
		};

		return cumulativeCode;
	});

	useEffect(() => {
		if (!bundle) {
			createBundle(cell.id, cumulativeCode.join('\n'));

			return;
		};

		const bundleTimer = setTimeout(async () => {
			createBundle(cell.id, cumulativeCode.join('\n'));
		}, 700);

		return () => clearTimeout(bundleTimer);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createBundle, cell.id, cumulativeCode.join('\n')]);

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