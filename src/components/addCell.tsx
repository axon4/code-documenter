import { useActions } from '../hooks/useActions';
import './addCell.css';

interface AddCellProps {
	nextCellID: string | null;
};

const AddCell: React.FC<AddCellProps> = ({ nextCellID }) => {
	const { insertCellBefore } = useActions();

	return (
		<div className='add-cell'>
			<div className='add-buttons'>
				<button
					className='button is-primary is-small is-rounded'
					onClick={() => insertCellBefore(nextCellID, 'code')}
				>
					<span className='icon is-small'>
						<i className='fas fa-plus' />
					</span>
					<span>Code</span>
				</button>
				<button
					className='button is-primary is-small is-rounded'
					onClick={() => insertCellBefore(nextCellID, 'text')}
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