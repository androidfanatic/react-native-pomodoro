import { combineReducers } from 'redux';
import timer from './timer';
import timesCompleted from './timesCompleted';
import running from './running';

let pomodoroApp = combineReducers({
    timer, running, timesCompleted
});

export default pomodoroApp;