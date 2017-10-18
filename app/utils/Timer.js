import { Animated } from 'react-native';
import store from '../store';
import setRunning from '../actions/setRunning';
import decreaseTimer from '../actions/decreaseTimer';
import resetTimer from '../actions/resetTimer';
import logger from '../utils/logger';

export default class Timer {

    constructor(){
        this.interval = null;
        this.unsubscribe = null;
    }

    stop() {
        this.stopTimer();
        logger.info('stopping');
        store.dispatch(setRunning(false));
        store.dispatch(resetTimer());
    }
    
    start() {
        this.unsubscribe = store.subscribe(() => {
            this.timerChanged(store.getState());
        });
        store.dispatch(setRunning(true));
        this.stopTimer();
        this.startTimer(); 
    }

    timerChanged(state){
        if(state.hasOwnProperty('timer')){
            logger.info('Timer changed', state.timer);
            if(state.timer === 0){
                if(this.unsubscribe){
                    this.unsubscribe();
                }
                this.stop();
            }
        }
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
