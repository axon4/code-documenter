import { useActions } from '../hooks/useActions';
import './addCell.css';

interface AddCellProps {
	previousCellID: string | null;
	forceVisibility?: boolean;
};

const AddCell: React.FC<AddCellProps> = ({ previousCellID, forceVisibility }) => {
	const { insertCellAfter } = useActions();

	return (
		<div className={`add-cell ${forceVisibility && 'force-visibility'}`}>
			<div className='add-buttons'>
				<button
					className='button is-primary is-small is-rounded'
					onClick={() => insertCellAfter(previousCellID, 'code')}
				>
					<span className='icon is-small'>
						<i className='fas fa-plus' />
					</span>
					<span>Code</span>
				</button>
				<button
					className='button is-primary is-small is-rounded'
					onClick={() => insertCellAfter(previousCellID, 'text')}
				>
					<span className='icon is-small'>
						<i className='fas fa-plus' />
					</span>
					<span>Text</span>
				</button>
			</div>
			<div className='divider' />
		</div>
	)
};

export default AddCell;