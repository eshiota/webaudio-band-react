import React from 'react';
import {findInstrumentById} from 'utils';

import context from 'audio/context';
import {exitNode} from 'audio/mixer';

import SequencerTrack from 'components/instruments/SequencerTrack';

class Sequencer extends React.Component {

    constructor (props) {
        super(props);

        this.id = (new Date()).getTime();

        this.onTrackButtonClickBound = this.onTrackButtonClick.bind(this);
    }

    componentWillMount() {
        this.props.registerInstrument(this.id, this.props.type, this.props.tracks);
    }

    componentDidMount() {
        this.gainNode = context.createGain();
        this.gainNode.connect(exitNode);
    }

    playSound (trackType) {
        console.warn('Sequencer: method `playSound` should be overriden');
    }

    onTrackButtonClick (trackType, e) {
        var instrument = findInstrumentById(this.props.instruments, this.id);
        var position = e.target.dataset.position;
        var value = instrument.state[trackType][position] === 0 ? 1 : 0;
        this.props.updateTrackState(this.id, trackType, position, value);
    }

    render () {
        var sequencerHeaderCells = [];

        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 4; j++) {
                sequencerHeaderCells.push(
                    <th
                        className={
                            'sequencer__header_cell ' +
                            (j === 0 ? 'sequencer__header_cell--first ' : '') +
                            (this.props.loopPosition === (i*4)+j ? 'sequencer__header_cell--active ' : '')
                        }
                        key={(i*4)+j}>{j+1}
                    </th>
                );
            }
        }

        var instrument = findInstrumentById(this.props.instruments, this.id);
        var instrumentState = instrument ? instrument.state : {};

        return (
            <div className="instrument instrument--sequencer sequencer sequencer--{this.props.type}">
                <table>
                    <thead>
                        <tr>
                            <th className="sequencer__track_name"></th>
                            {sequencerHeaderCells}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.tracks.map((item, i) => {
                            return (
                                <SequencerTrack {...this.props}
                                    name={item.name}
                                    type={item.type}
                                    playSound={this.playSound.bind(this, item.type)}
                                    key={i}
                                    onTrackButtonClick={this.onTrackButtonClickBound}
                                    buttonStates={instrumentState[item.type] ? instrumentState[item.type] : []}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }

    static mapStateToProps (state) {
        return {
            loopPosition: state.loop.position,
            instruments: state.instruments
        };
    }

    static mapDispatchToProps (dispatch) {
        return {
            registerInstrument: function (id, sequencerType, tracks) {
                dispatch({
                    type: 'ADD_INSTRUMENT',
                    payload: {
                        id: id,
                        type: sequencerType + '_sequencer',
                        state: tracks.reduce((m, track) => {
                            var trackState = [];

                            for (var i = 0; i < 32; i++) {
                                trackState.push(0);
                            }

                            m[track.type] = trackState;

                            return m;
                        }, {})
                    }
                });
            },

            updateTrackState: function (id, track, index, value) {
                dispatch({
                    type: 'UPDATE_INSTRUMENT_STATE',
                    payload: { id, track, index, value }
                });
            }
        }
    }

}

Sequencer.defaultProps = {
    tracks : []
};

export default Sequencer;
