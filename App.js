import React from 'react';
import { Provider } from 'react-redux';
import store from './app/store';

import PomodoroHome from './app/screens/PomodoroHome';


export default class App extends React.Component {

    render() {
        return (
            <Provider store={store}><PomodoroHome /></Provider>
        );
    }
}