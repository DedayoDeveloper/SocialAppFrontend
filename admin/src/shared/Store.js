import { createStore } from 'redux';
import reducer from '../store/reducers';

const store = createStore(reducer);

export default store;