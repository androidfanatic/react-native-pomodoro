import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

const TimerText = ({timer}) => {

    let mm = Math.floor(timer / 60);
    if (mm < 10) mm = `0${mm}`;
    
    let ss = timer % 60;
    if (ss < 10) ss = `0${ss}`;
    
    return (
        <Text 
          style={{ color: '#ddd', fontSize: 120 }}>
            {`${mm}:${ss}`}
        </Text>
    );
}

TimerText.propTypes = {
    timer: PropTypes.number.isRequired
};

export default TimerText;