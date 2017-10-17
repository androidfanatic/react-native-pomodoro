import { DECREASE_TIMER } from '../constants/actions';

export default function decreaseTimer(value = 1){
    return {
        type : DECREASE_TIMER,
        value
    };
}