import React from 'react';
import {connect} from 'react-redux';
import keycode from 'keycode';
import context from 'audio/context';
import {exitNode} from 'audio/mixer';
import buffersPromise from 'audio/soundBuffers/drums';
import DrumPadButton from 'components/controls/DrumPadButton';

let keySoundMap = {
    'space' : 'kick',
    'z' : 'crash',
    'x' : 'hihat_closed',
    'c' : 'hihat_open',
    'v' : 'snare',
    'b' : 'tom_hi',
    'n' : 'tom_low'
};

class Drums extends React.Component {

    constructor (props) {
        super(props);

        this.id = (new Date()).getTime();

        this.playSound = this.playSound.bind(this);
        this.onKeyDownBound = this.onKeyDown.bind(this); // argh, is there a better way?
    }

    playSound (type) {
        let source = context.createBufferSource();

        source.buffer = this.buffers[type];
        source.connect(this.gainNode);
        source.start(0);
    }

    onKeyDown (e) {
        let sound = keySoundMap[keycode(e)];

        if (sound) {
            this.playSound(sound);
        }
    }

    componentWillMount() {
        this.props.registerInstrument(this.id);
    }

    componentDidMount() {
        buffersPromise.then((buffers) => {
            this.buffers = buffers;
            window.addEventListener('keydown', this.onKeyDownBound);
        });
        this.gainNode = context.createGain();
        this.gainNode.connect(exitNode);
    }

    componentWillUnmount() {
        this.buffers = null;
        this.gainNode.disconnect();
        this.gainNode = null;
        window.removeEventListener('keydown', this.onKeyDownBound);
    }

    render () {
        return (
            <div className="instrument instrument--drums">
                <DrumPadButton onButtonClick={this.playSound} type="kick" name="Kick" />
                <DrumPadButton onButtonClick={this.playSound} type="crash" name="Crash" />
                <DrumPadButton onButtonClick={this.playSound} type="hihat_closed" name="Closed hihat" />
                <DrumPadButton onButtonClick={this.playSound} type="hihat_open" name="Open hihat" />
                <DrumPadButton onButtonClick={this.playSound} type="snare" name="Snare" />
                <DrumPadButton onButtonClick={this.playSound} type="tom_hi" name="Hi tom" />
                <DrumPadButton onButtonClick={this.playSound} type="tom_low" name="Low tom" />
            </div>
        );
    }

}

function mapStateToProps () {
    return {};
}

function mapDispatchToProps (dispatch) {
    return {
        registerInstrument: function (id) {
            dispatch({
                type: 'ADD_INSTRUMENT',
                payload: {
                    id: id,
                    type: 'drums',
                    state: null
                }
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Drums);