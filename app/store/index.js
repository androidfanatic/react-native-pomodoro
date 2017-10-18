import { createStore } from 'redux';
import pomodoroApp from '../reducers';
let store = createStore(pomodoroApp);
export default store;