import { UPDATE_TIMES_COMPLETED } from '../constants/actions';

const timesCompleted = (timesCompleted = 0, action) => {
    switch (action.type) {
    case UPDATE_TIMES_COMPLETED:
        return action.timesCompleted;
    }
    return timesCompleted;
};

export default timesCompleted;