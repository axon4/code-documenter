import { useState, useEffect } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './reSizable.css';

interface ReSizableProps {
	direction: 'horizontal' | 'vertical';
};

const ReSizable: React.FC<ReSizableProps> = ({ direction, children }) => {
	const [ innerWidth, setInnerWidth ] = useState(window.innerWidth);
	const [ innerHeight, setInnerHeight ] = useState(window.innerHeight);
	const [ width, setWidth ] = useState(innerWidth * 0.67);

	useEffect(() => {
		let reSizeTimer: NodeJS.Timeout;

		const reSizeHandler = () => {
			if (reSizeTimer) {
				clearTimeout(reSizeTimer);
			};

			reSizeTimer = setTimeout(() => {
				setInnerWidth(window.innerWidth);
				setInnerHeight(window.innerHeight);

				if (window.innerWidth * 0.83 < width) {
					setWidth(window.innerWidth * 0.83);
				};
			}, 100);
		};

		window.addEventListener('resize', reSizeHandler);

		return () => {window.removeEventListener('resize', reSizeHandler)};
	}, [width]);

	let reSizableProps: ResizableBoxProps;

	if (direction === 'vertical') {
		reSizableProps = {
			width: Infinity,
			height: 300,
			resizeHandles: ['s'],
			minConstraints: [Infinity, innerHeight * 0.17],
			maxConstraints: [Infinity, innerHeight * 0.83]
		};
	} else {
		reSizableProps = {
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
		<ResizableBox {...reSizableProps}>
			{children}
		</ResizableBox>
	);
};

export default ReSizable;