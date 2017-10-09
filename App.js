import React from 'react';
import PomodoroBtn from './components/pomodoro_btn.js';
import TimerText from './components/timer_text.js';
import { StyleSheet, Animated } from 'react-native';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.interval = null;
        this.state = {
            running: false,
            timer: 10,
            initVal: 10,
            bgColor: new Animated.Value(0)
        };
    }

    tapBtn() {
        this.state.running ? this.stop(): this.start();
    }

    stop() {
        Animated.spring(this.state.bgColor, { toValue: 0 }).start();
        this.setState({ timer: this.state.initVal, running: false });
        this.clearInterval();
    }

    start() {
        Animated.spring(this.state.bgColor, { toValue: 1 }).start();
        this.setState({ timer: this.state.initVal, running: true });
        this.clearInterval();
        this.startInterval();
    }

    clearInterval() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    runTimer() {
        let timer = this.state.timer - 1;
        this.setState({ timer: timer });
        if (timer == 0) {
            this.timerFinished();
        }
    }

    timerFinished(){
        this.clearInterval(this.interval);
    }

    startInterval() {
        this.runTimer();
        this.interval = setInterval(this.runTimer.bind(this), 1000);
    }

    render() {
        return (
            <Animated.View 
                style = {[{ 
                        flex: 1, alignItems: 'center', justifyContent: 'center' 
                    }, { backgroundColor: this.state.bgColor.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['#333', '#c43'],
                    })
                }]}>
                <TimerText time={this.state.timer} />
                <PomodoroBtn 
                    press={this.tapBtn.bind(this)}
                    state={this.state.running}
                />
            </Animated.View>
        );
    }
}