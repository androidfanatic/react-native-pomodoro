import { DECREASE_TIMER } from '../actions/types';

const INIT_VAL = 25 * 60;

const timer = (timer = INIT_VAL, action) => {
    switch (action.type) {
        case DECREASE_TIMER:
            if (action.decreaseBy) {
                return timer - action.decreaseBy;
            }
            break;
    }
    return timer;
}

export default timer;