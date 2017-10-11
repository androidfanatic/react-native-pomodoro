import { connect } from 'react-redux'
import decreaseTimer from '../actions/decreaseTimer';
import setRunning from '../actions/setRunning';

import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Animated } from 'react-native';
import ImageButton from '../ui/ImageButton.js';
import TimerText from '../ui/TimerText.js';
  
let interval = null;
let bgColor = new Animated.Value(0);

const stop = (dispatch) => {
    Animated.spring(bgColor, { toValue: 0 }).start();
    dispatch(setRunning(false));
    // dispatch(resetTimer());
    stopTimer();
}

const start = (dispatch) => {
    Animated.spring(bgColor, { toValue: 1 }).start();
    dispatch(setRunning(true));
    stopTimer();
    startTimer(dispatch);
}

const stopTimer = () => {
    if (interval) {
        clearInterval(interval);
        interval = null;
    }
}

const runTimer = (dispatch) => {
    dispatch(decreaseTimer());
}

const startTimer = (dispatch) => {
    runTimer(dispatch);
    interval = setInterval(() => {
        runTimer(dispatch);
    }, 1000);
}

const mapStateToProps = (state, ownProps) => {
    return {
        timer: state.timer,
        running: state.running
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return { 
        start: () => {
            start(dispatch)
        }, 
        stop: () => {
            stop(dispatch)
        }
    }
}  
    
const RootView = ({timer, start, stop, running}) => {
    
    let backgroundColor = bgColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['#333', '#c43'],
    });

    return (
        <Animated.View 
        style = {[{ 
                flex: 1, alignItems: 'center', justifyContent: 'center' 
            }, { backgroundColor } ]}>
        <TimerText timer={timer} />
        <ImageButton 
            onClick={running ? stop : start}
            name={running ? "stop": "play"}
        />
    </Animated.View>
    );
};

RootView.propTypes = {
    timer: PropTypes.number.isRequired,
    start: PropTypes.func.isRequired,
    stop: PropTypes.func.isRequired,
    running: PropTypes.bool.isRequired
}

const PomodoroView =  connect(mapStateToProps, mapDispatchToProps)(RootView);

export default PomodoroView;