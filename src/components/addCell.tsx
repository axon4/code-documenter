import { useActions } from '../hooks/useActions';
import './addCell.css';

interface AddCellProps {
    nextCellID: string;
};

const AddCell: React.FC<AddCellProps> = ({ nextCellID }) => {
    const { insertCellBefore } = useActions();

    return (
        <div>
            <button onClick={() => insertCellBefore(nextCellID, 'code')}></button>
            <button onClick={() => insertCellBefore(nextCellID, 'text')}></button>
        </div>
    )
};

export default AddCell;