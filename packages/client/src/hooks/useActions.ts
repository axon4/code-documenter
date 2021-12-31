import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../redux';

export const useActions = () => {
	const disPatch = useDispatch();

	return useMemo(() => {
		return bindActionCreators(actionCreators, disPatch);
	}, [disPatch]);
};