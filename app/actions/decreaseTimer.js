import { DECREASE_TIMER } from './types';

export default function decreaseTimer(decreaseBy = 1){
    return {
        type : DECREASE_TIMER,
        decreaseBy
    }
}