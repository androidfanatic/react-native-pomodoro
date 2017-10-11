import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import pomodoroApp from './app/reducers';
import PomodoroView from './app/containers/PomodoroView';

let store = createStore(pomodoroApp);

export default class App extends React.Component {

    render() {
        return (
            <Provider store={store}><PomodoroView /></Provider>
        );
    }
} 