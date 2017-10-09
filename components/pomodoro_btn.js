import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class PomodoroBtn extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Icon 
                name={this.props.state  ? 'pause' : 'play'}
                onPress = {this.props.press} style={{color: '#ddd', fontSize: 24 }} />
        );
    }
}