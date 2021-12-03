import { useTypedSelector } from '../hooks/useTypedSelector';
import AddCell from './addCell';
import CellListItem from './cellListItem';

const CellList: React.FC = () => {
	const cells = useTypedSelector(({ cell: { order, data }}) => order.map(id => data[id]));

	const renderedCells = cells.map(cell => <>
		<AddCell nextCellID={cell.id} />
		<CellListItem key={cell.id} cell={cell} />
	</>);

	return (
		<div>
			{renderedCells}
			<AddCell nextCellID={null} />
		</div>
	);
};

export default CellList;