import React from 'react';
import {connect} from 'react-redux';

import context from 'audio/context';

import Sequencer from 'components/instruments/Sequencer';

import buffersPromise from 'audio/soundBuffers/drumsSequencer';

class DrumsSequencer extends Sequencer {

    constructor (props) {
        super(props);
    }

    componentDidMount() {
        super.componentDidMount(...arguments);

        buffersPromise.then((buffers) => {
            this.buffers = buffers;
        });
    }

    playSound (trackType) {
        let source = context.createBufferSource();

        source.buffer = this.buffers[trackType];
        source.connect(this.gainNode);
        source.start(0);
    }
}

DrumsSequencer.defaultProps = {
    type: 'drums',
    tracks : [{
        name: 'Kick',
        type: 'kick'
    }, {
        name: 'Snare',
        type: 'snare'
    }, {
        name: 'Hihat (open)',
        type: 'hihat_open'
    }, {
        name: 'Hihat (closed)',
        type: 'hihat_closed'
    }, {
        name: 'High Tom',
        type: 'tom_hi'
    }, {
        name: 'Low Tom',
        type: 'tom_low'
    }, {
        name: 'Crash',
        type: 'crash'
    }]
};

export default connect(Sequencer.mapStateToProps, Sequencer.mapDispatchToProps)(DrumsSequencer);
