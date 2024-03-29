import { Cell } from '../redux';
import CodeCell from './codeCell';
import TextEditor from './textEditor';
import ActionBar from './actionBar';
import './cellListItem.css';

interface CellListItemProps {
	cell: Cell;
};

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
	let item: JSX.Element;

	if (cell.type === 'code') {
		item = <>
			<div className='action-bar-wrapper'>
				<ActionBar ID={cell.ID} />
			</div>
			<CodeCell cell={cell} />
		</>
	} else {
		item = <>
			<TextEditor cell={cell} />
			<ActionBar ID={cell.ID} />
		</>
	};

	return (
		<div className='cell-list-item'>
			{item}
		</div>
	);
};

export default CellListItem;