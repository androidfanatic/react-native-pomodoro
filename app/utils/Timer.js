import store from '../store';
import setRunning from '../actions/setRunning';
import decreaseTimer from '../actions/decreaseTimer';
import resetTimer from '../actions/resetTimer';
import updateTimesCompleted from '../actions/updateTimesCompleted';
import Logger from '../utils/Logger';

import { COMPLETED_TIMES_KEY } from '../constants/timer';

import { AsyncStorage } from 'react-native';

export default class Timer {

    constructor() {
        this.interval = null;
        this.unsubscribe = null;
        this.timesCompleted = 0;
        AsyncStorage.getItem(COMPLETED_TIMES_KEY, 0).then(timesCompleted => {
            if (timesCompleted) {
                this.timesCompleted = parseInt(timesCompleted);
                store.dispatch(updateTimesCompleted(this.timesCompleted));
            }
        });
    }

    stop() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
        this.stopTimer();
        Logger.info('stopping');
        store.dispatch(setRunning(false));
        store.dispatch(resetTimer());
    }

    start() {
        this.unsubscribe = store.subscribe(() => {
            this.timerChanged(store.getState().timer);
        });
        store.dispatch(setRunning(true));
        this.stopTimer();
        this.startTimer();
    }

    timerChanged(timer) {
        if (timer === 0) {
            this.stop();
            this.completed();
        }
    }

    completed() {
        this.timesCompleted++;
        AsyncStorage.setItem(COMPLETED_TIMES_KEY, this.timesCompleted.toString());
        store.dispatch(updateTimesCompleted(this.timesCompleted));
    }

    stopTimer() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    runTimer() {
        store.dispatch(decreaseTimer());
    }

    startTimer() {
        this.interval = setInterval(() => {
            this.runTimer();
        }, 1000);
    }
}