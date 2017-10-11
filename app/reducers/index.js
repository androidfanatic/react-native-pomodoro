import { combineReducers } from 'redux';
import timer from './timer';
import running from './running';

let pomodoroApp = combineReducers({
    timer, running
});

export default pomodoroApp;