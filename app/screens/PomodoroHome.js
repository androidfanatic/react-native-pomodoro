import { connect } from 'react-redux';

import React from 'react';
import PropTypes from 'prop-types';
import { Text, Animated } from 'react-native';
import ImageButton from '../components/ImageButton';
import TimerText from '../components/TimerText';

import Timer from '../utils/Timer';
import TimerTextUtil from '../utils/TimerTextUtil';
import store from '../store';

let timer = new Timer();
let bgColor = new Animated.Value(0);

store.subscribe(() => {
    let state = store.getState();
    console.log(JSON.stringify(state));
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
        running: state.running,
        timesCompleted: state.timesCompleted
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return { 
        start: () => timer.start(), 
        stop: () => timer.stop()
    };
};  
    
const RootView = ({timer, start, stop, running, timesCompleted}) => {
    
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
            <Text style={{
                margin: 16,
                color: '#aaa'
            }}>{timesCompleted === 0 ? 
                `Start winning with Pomodoro!` : 
                `You have won a total of ${timesCompleted} times.`
                }
            </Text>
        </Animated.View>
    );
};

RootView.propTypes = {
    timer: PropTypes.number.isRequired,
    start: PropTypes.func.isRequired,
    stop: PropTypes.func.isRequired,
    running: PropTypes.bool.isRequired,
    timesCompleted: PropTypes.number.isRequired
};

const PomodoroHome =  connect(mapStateToProps, mapDispatchToProps)(RootView);

export default PomodoroHome;