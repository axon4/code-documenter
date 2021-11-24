import { Cell } from '../redux';
import CodeCell from './codeCell';
import TextEditor from './textEditor';
import ActionBar from './actionBar';
import 'cellListItem.css';

interface CellListItemProps {
	cell: Cell;
};

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
	let item: JSX.Element;

	if (cell.type === 'code') {
		item = <CodeCell cell={cell} />
	} else {
		item = <TextEditor cell={cell} />
	};

	return (
		<div className='cell-list-item'>
			<ActionBar id={cell.id} />
			{item}
		</div>
	);
};

export default CellListItem;