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
        if(this.unsubscribe){
            this.unsubscribe();
        }
        this.stopTimer();
        logger.info('stopping');
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

    timerChanged(timer){
        if(timer === 0){
            this.stop();
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
