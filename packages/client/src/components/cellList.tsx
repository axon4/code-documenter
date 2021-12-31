import { Fragment, useEffect } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import AddCell from './addCell';
import CellListItem from './cellListItem';
import { useActions } from '../hooks/useActions';
import './cellList.css';

const CellList: React.FC = () => {
	const cells = useTypedSelector(({ cell: { order, data }}) => order.map(id => data[id]));
	const { fetchCells } = useActions();

	useEffect(() => {
		fetchCells();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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