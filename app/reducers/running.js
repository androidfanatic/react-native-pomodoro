import { SET_RUNNING } from '../actions/types';

const running = (running = false, action) => {
    switch (action.type) {
        case SET_RUNNING:
            return action.running;
            break;
    }
    return running;
}

export default running;