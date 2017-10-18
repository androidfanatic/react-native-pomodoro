import { connect } from 'react-redux';

import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import ImageButton from '../components/ImageButton';
import TimerText from '../components/TimerText';

import Timer from '../utils/Timer';
import TimerTextUtil from '../utils/TimerTextUtil';
import logger from '../utils/logger';
import store from '../store';

let timer = new Timer();
let bgColor = new Animated.Value(0);

store.subscribe(() => {
    let state = store.getState();
    if(state.hasOwnProperty('running')) {
        if(state.running) {
            Animated.spring(bgColor, { toValue: 1 }).start();
        } else {
            Animated.spring(bgColor, { toValue: 0 }).start();
        }
    }
});

const mapStateToProps = state => {
    return {
        timer: state.timer,
        running: state.running
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return { 
        start: () => timer.start(), 
        stop: () => timer.stop()
    };
};  
    
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
            <TimerText 
              mm={TimerTextUtil.getMM(timer)} 
              ss={TimerTextUtil.getSS(timer)}
            />
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