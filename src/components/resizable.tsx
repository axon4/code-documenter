import { ResizableBox } from 'react-resizable';
import './resizable.css';

interface ResizableProps {
	direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
	return (
		<ResizableBox
			width={Infinity}
			height={300}
			resizeHandles={['s']}
			minConstraints={[Infinity, 24]}
			maxConstraints={[Infinity, window.innerHeight * 0.83]}
		>
			{children}
		</ResizableBox>
	)
};

export default Resizable;