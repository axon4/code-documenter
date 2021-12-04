import { Fragment } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import AddCell from './addCell';
import CellListItem from './cellListItem';

const CellList: React.FC = () => {
	const cells = useTypedSelector(({ cell: { order, data }}) => order.map(id => data[id]));

	const renderedCells = cells.map(cell => (
		<Fragment key={cell.id}>
			<AddCell nextCellID={cell.id} />
			<CellListItem cell={cell} />
		</Fragment>
	));

	return (
		<div>
			{renderedCells}
			<AddCell nextCellID={null} forceVisibility={cells.length === 0} />
		</div>
	);
};

export default CellList;