import { connect } from 'react-redux';
import decreaseTimer from '../actions/decreaseTimer';
import resetTimer from '../actions/resetTimer';
import setRunning from '../actions/setRunning';

import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import ImageButton from '../components/ImageButton';
import TimerText from '../components/TimerText';

import TimerTextUtil from '../utils/TimerTextUtil';
  
let interval = null;
let bgColor = new Animated.Value(0);

const stop = (dispatch) => {
    Animated.spring(bgColor, { toValue: 0 }).start();
    dispatch(setRunning(false));
    dispatch(resetTimer());
    stopTimer();
};

const start = (dispatch) => {
    Animated.spring(bgColor, { toValue: 1 }).start();
    dispatch(setRunning(true));
    stopTimer();
    startTimer(dispatch);
};

const stopTimer = () => {
    if (interval) {
        clearInterval(interval);
        interval = null;
    }
};

const runTimer = (dispatch) => {
    dispatch(decreaseTimer());
};

const startTimer = (dispatch) => {
    runTimer(dispatch);
    interval = setInterval(() => {
        runTimer(dispatch);
    }, 1000);
};

const mapStateToProps = state => {
    return {
        timer: state.timer,
        running: state.running
    };
};

const mapDispatchToProps = dispatch => {
    return { 
        start: () => {
            start(dispatch);
        }, 
        stop: () => {
            stop(dispatch);
        }
    };
};  
    
const RootView = ({timer, start, stop, running}) => {
    
    let backgroundColor = bgColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['#333', '#c43'],
    });

    let mm = TimerTextUtil.getMM(timer);
    let ss = TimerTextUtil.getSS(timer);

    return (
        <Animated.View 
            style = {[{ 
                flex: 1, alignItems: 'center', justifyContent: 'center' 
            }, { backgroundColor } ]}>
            <TimerText mm={mm} ss={ss} />
            <ImageButton 
                onClick={running ? stop : start}
                name={running ? 'stop': 'play'}
            />
        </Animated.View>
    );
};

RootView.propTypes = {
    timer: PropTypes.number.isRequired,
    start: PropTypes.func.isRequired,
    stop: PropTypes.func.isRequired,
    running: PropTypes.bool.isRequired
};

const PomodoroHome =  connect(mapStateToProps, mapDispatchToProps)(RootView);

export default PomodoroHome;