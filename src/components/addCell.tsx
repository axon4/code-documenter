import { useActions } from '../hooks/useActions';
import './addCell.css';

interface AddCellProps {
    nextCellID: string | null;
};

const AddCell: React.FC<AddCellProps> = ({ nextCellID }) => {
    const { insertCellBefore } = useActions();

    return (
        <div>
            <button onClick={() => insertCellBefore(nextCellID, 'code')}>Code</button>
            <button onClick={() => insertCellBefore(nextCellID, 'text')}>Text</button>
        </div>
    )
};

export default AddCell;