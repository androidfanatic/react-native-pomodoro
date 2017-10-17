import { RESET_TIMER, DECREASE_TIMER } from '../constants/actions';

const INIT_VAL = 10;

const timer = (timer = INIT_VAL, action) => {
    switch (action.type) {
        case DECREASE_TIMER:
            if (action.value) {
                return timer - action.value;
            }
            break;
        case RESET_TIMER:
            return INIT_VAL;
    }
    return timer;
}

export default timer;