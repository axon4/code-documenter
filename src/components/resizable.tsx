import { useState, useEffect } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizable.css';

interface ResizableProps {
	direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
	const [ innerWidth, setInnerWidth ] = useState(window.innerWidth);
	const [ innerHeight, setInnerHeight ] = useState(window.innerHeight);

	useEffect(() => {
		const resizeListener = () => {
			setInnerWidth(window.innerWidth);
			setInnerHeight(window.innerHeight);
		};
		window.addEventListener('resize', resizeListener);

		return () => window.removeEventListener('resize', resizeListener);
	}, []);

	let resizableProps: ResizableBoxProps;
	if (direction === 'vertical') {
		resizableProps = {
			width: Infinity,
			height: 300,
			resizeHandles: ['s'],
			minConstraints: [Infinity, innerHeight * 0.17],
			maxConstraints: [Infinity, innerHeight * 0.83]
		};
	} else {
		resizableProps = {
			className: 'resize-horizontal',
			width: innerWidth * 0.83,
			height: Infinity,
			resizeHandles: ['e'],
			minConstraints: [innerWidth * 0.17, Infinity],
			maxConstraints: [innerWidth * 0.83, Infinity]
		};
	};

	return (
		<ResizableBox {...resizableProps}>
			{children}
		</ResizableBox>
	)
};

export default Resizable;