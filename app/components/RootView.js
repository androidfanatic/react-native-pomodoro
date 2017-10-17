import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Animated } from 'react-native';
import ImageButton from '../ui/ImageButton.js';
import TimerText from '../ui/TimerText.js';

const RootView = ({bgColor, timer, start, stop, running}) => {
    
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

export default RootView;