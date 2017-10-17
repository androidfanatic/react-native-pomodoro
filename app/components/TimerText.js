import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

const TimerText = ({mm, ss}) => {    

    return (
        <Text 
            style={{ color: '#ddd', fontSize: 120 }}>
            {`${mm}:${ss}`}
        </Text>
    );
};

TimerText.propTypes = {
    mm: PropTypes.string.isRequired,
    ss: PropTypes.string.isRequired
};

export default TimerText;