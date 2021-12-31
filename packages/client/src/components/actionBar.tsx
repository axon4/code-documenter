import { useActions } from '../hooks/useActions';
import './actionBar.css';

interface ActionBarProps {
	ID: string;
};

const ActionBar: React.FC<ActionBarProps> = ({ ID }) => {
	const { moveCell, deleteCell } = useActions();

	return (
		<div className='action-bar'>
			<button className='button is-primary is-small' onClick={() => moveCell(ID, 'up')}>
				<span className='icon'>
					<i className='fas fa-arrow-up' />
				</span>
			</button>
			<button className='button is-primary is-small' onClick={() => moveCell(ID, 'down')}>
				<span className='icon'>
					<i className='fas fa-arrow-down' />
				</span>
			</button>
			<button className='button is-primary is-small' onClick={() => deleteCell(ID)}>
				<span className='icon'>
					<i className='fas fa-times' />
				</span>
			</button>
		</div>
	);
};

export default ActionBar;