import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Application from './Application';
import store from './redux/store';

ReactDOM.render(
	<Provider store={store}>
		<Application />
	</Provider>
, document.getElementById('root'));