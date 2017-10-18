export default class TimerTextUtil {
    static getMM(timer) {
        let mm = Math.floor(timer / 60);
        if (mm < 0) mm = 0;
        if (mm < 10) mm = `0${mm}`;
        return mm.toString();
    }

    static getSS(timer) {
        let ss = timer % 60;
        if (ss < 0) ss = 0;
        if (ss < 10) ss = `0${ss}`;
        return ss.toString();
    }
}