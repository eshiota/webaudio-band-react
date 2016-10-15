import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import store from 'store';

import Mixer from './components/Mixer';
import LoopController from './components/LoopController';
import Drums from './components/instruments/Drums';
import DrumsSequencer from './components/instruments/DrumsSequencer';

class App extends React.Component {

    render () {
        return (
            <div>
                <Mixer />
                <LoopController />

                <div className="instruments">
                    <Drums />
                    <DrumsSequencer />
                </div>
            </div>
        );
    }

}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'));
