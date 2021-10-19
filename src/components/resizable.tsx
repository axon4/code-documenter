import { useState, useEffect } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizable.css';

interface ResizableProps {
	direction: 'horizontal' | 'vertical';
};

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
	const [ innerWidth, setInnerWidth ] = useState(window.innerWidth);
	const [ innerHeight, setInnerHeight ] = useState(window.innerHeight);
	const [ width, setWidth ] = useState(innerWidth);

	useEffect(() => {
		let timer: any;
		const resizeListener = () => {
			if (timer) {
				clearTimeout(timer);
			};

			timer = setTimeout(() => {
				setInnerWidth(window.innerWidth);
				setInnerHeight(window.innerHeight);

				if (window.innerWidth * 0.83 < width) {
					setWidth(window.innerWidth * 0.83);
				};
			}, 100);
		};
		window.addEventListener('resize', resizeListener);

		return () => window.removeEventListener('resize', resizeListener);
	}, [width]);

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
			width,
			height: Infinity,
			resizeHandles: ['e'],
			minConstraints: [innerWidth * 0.17, Infinity],
			maxConstraints: [innerWidth * 0.83, Infinity],
			onResizeStop: (event, data) => {
				setWidth(data.size.width);
			}
		};
	};

	return (
		<ResizableBox {...resizableProps}>
			{children}
		</ResizableBox>
	);
};

export default Resizable;