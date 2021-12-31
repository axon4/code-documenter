import { useEffect } from 'react';
import ReSizable from './reSizable';
import CodeEditor from './codeEditor';
import PreView from './preView';
import { Cell } from '../redux';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useCumulativeCode } from '../hooks/useCumulativeCode';
import './codeCell.css';

interface CodeCellProps {
	cell: Cell;
};

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
	const { upDateCell, createBundle } = useActions();
	const bundle = useTypedSelector(state => {
		if (state.bundle) {
			return state.bundle[cell.ID];
		};
	});
	const cumulativeCode = useCumulativeCode(cell.ID);

	useEffect(() => {
		if (!bundle) {
			createBundle(cell.ID, cumulativeCode);

			return;
		};

		const bundleTimer = setTimeout(async () => {
			createBundle(cell.ID, cumulativeCode);
		}, 700);

		return () => {clearTimeout(bundleTimer)};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createBundle, cell.ID, cumulativeCode]);

	return (
		<ReSizable direction='vertical'>
			<div style={{display: 'flex', flexDirection: 'row', height: 'calc(100% - 0.5rem)'}}>
				<ReSizable direction='horizontal'>
					<CodeEditor initialValue={cell.conTent} onChange={value => upDateCell(cell.ID, value)} />
				</ReSizable>
				<div className='progress-cover-wrapper'>
					{!bundle || bundle.loading ? (
						<div className='progress-cover'>
							<progress className='progress is-primary is-small' max='100'>
								LOADING...
							</progress>
						</div>
					) : <PreView code={bundle.code} error={bundle.error} />}
				</div>
			</div>
		</ReSizable>
	);
};

export default CodeCell;