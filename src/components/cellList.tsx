import { Fragment } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import AddCell from './addCell';
import CellListItem from './cellListItem';
import './cellList.css';

const CellList: React.FC = () => {
	const cells = useTypedSelector(({ cell: { order, data }}) => order.map(id => data[id]));

	const renderedCells = cells.map(cell => (
		<Fragment key={cell.id}>
			<CellListItem cell={cell} />
			<AddCell previousCellID={cell.id} />
		</Fragment>
	));

	return (
		<div className='cell-list'>
			<AddCell previousCellID={null} forceVisibility={cells.length === 0} />
			{renderedCells}
		</div>
	);
};

export default CellList;