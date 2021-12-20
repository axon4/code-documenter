import { useTypedSelector } from './useTypedSelector';

export const useCumulativeCode = (cellID: string) => {
    return useTypedSelector(state => {
		const { data, order } = state.cell;
		const orderedCells = order.map(ID => data[ID]);
		const showFunction = `
			import _React from 'react';
			import _ReactDOM from 'react-dom';

			var show = value => {
				const root = document.getElementById('root');

				if (typeof value === 'object') {
					if (value.$$typeof && value.props) {
						_ReactDOM.render(value, root);
					} else {
						root.innerHTML = JSON.stringify(value);
					}
				} else {
					root.innerHTML = value;
				};
			};
		`;
		const showFunctionEmpty = 'var show = value => {};';

		const cumulativeCode = [];
		for (let orderedCell of orderedCells) {
			if (orderedCell.type === 'code') {
				orderedCell.id === cellID
					? cumulativeCode.push(showFunction)
					: cumulativeCode.push(showFunctionEmpty);
					
				cumulativeCode.push(orderedCell.content);
			};

			if (orderedCell.id === cellID) {
				break;
			};
		};

		return cumulativeCode;
	})
		.join('\n');
};