import { DECREASE_TIMER } from '../constants/actions';

export default function setRunning(running = false){
    return {
        type : SET_RUNNING,
        running
    }
}