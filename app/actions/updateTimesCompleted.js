import { UPDATE_TIMES_COMPLETED } from '../constants/actions';

export default function updateTimesCompleted(timesCompleted = 0){
    return {
        type : UPDATE_TIMES_COMPLETED,
        timesCompleted
    };
}