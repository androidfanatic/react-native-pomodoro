import React from 'react';
import {Text} from 'react-native';

export default class TimerText extends React.Component {

    constructor(props) {
        super(props);
    }

    getTimeString(time) {
        let mm = Math.floor(time / 60);
        let ss = time % 60;
        if (mm < 10) mm = `0${mm}`;
        if (ss < 10) ss = `0${ss}`;
        let str = `${mm}:${ss}`;
        return str;
    }

    render() {
        return (
            <Text style={{ color: '#ddd', fontSize: 120 }}>{this.getTimeString(this.props.time)}</Text>
        );
    }
}