import { Fragment, useEffect } from 'react';
import AddCell from './addCell';
import CellListItem from './cellListItem';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import './cellList.css';

const CellList: React.FC = () => {
	const cells = useTypedSelector(({ cell: { order, data } }) => order.map(ID => data[ID]));
	const { fetchCells } = useActions();

	useEffect(() => {
		fetchCells();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderedCells = cells.map(cell => (
		<Fragment key={cell.ID}>
			<CellListItem cell={cell} />
			<AddCell previousCellID={cell.ID} />
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