import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizable.css';

interface ResizableProps {
	direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
	let resizableProps: ResizableBoxProps;

	if (direction === 'vertical') {
		resizableProps = {
			width: Infinity,
			height: 300,
			resizeHandles: ['s'],
			minConstraints: [Infinity, window.innerHeight * 0.17],
			maxConstraints: [Infinity, window.innerHeight * 0.83]
		};
	} else {
		resizableProps = {
			className: 'resize-horizontal',
			width: window.innerWidth * 0.83,
			height: Infinity,
			resizeHandles: ['e'],
			minConstraints: [window.innerWidth * 0.17, Infinity],
			maxConstraints: [window.innerWidth * 0.83, Infinity]
		};
	};

	return (
		<ResizableBox {...resizableProps}>
			{children}
		</ResizableBox>
	)
};

export default Resizable;