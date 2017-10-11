import { SET_RUNNING } from './types';

export default function setRunning(running = false){
    return {
        type : SET_RUNNING,
        running
    }
}