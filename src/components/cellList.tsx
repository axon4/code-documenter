import { useTypedSelector } from '../hooks/useTypedSelector';
import CellListItem from './cellListItem';

const CellList: React.FC = () => {
	const cells = useTypedSelector(({ cell: { order, data }}) => order.map(id => data[id]));

	const renderedCells = cells.map(cell => <CellListItem key={cell.id} cell={cell} />);

	return (
		<div>
			{renderedCells}
		</div>
	);
};

export default CellList;