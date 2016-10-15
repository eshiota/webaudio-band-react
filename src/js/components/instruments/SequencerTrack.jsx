import React from 'react';

class SequencerTrack extends React.Component {

    constructor (props) {
        super(props);

        this.onTrackButtonClick = this.props.onTrackButtonClick.bind(null, this.props.type);
    }

    render () {
        var sequencerCells = [];

        if (this.props.loopPosition !== -1 && this.props.buttonStates[this.props.loopPosition] === 1) {
            this.props.playSound()
        }

        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 4; j++) {
                let key = (i * 4) + j;
                sequencerCells.push(
                    <th
                        data-position={key}
                        className={
                            'sequencer__cell ' +
                            (j === 0 ? 'sequencer__cell--first ' : '') +
                            (this.props.loopPosition === key ? 'sequencer__cell--active ' : '') +
                            (this.props.buttonStates[key] === 1 ? 'sequencer__cell--on ' : '')
                        }
                        key={key}
                    >
                        <button onClick={this.onTrackButtonClick} data-position={key}>
                        </button>
                    </th>
                );
            }
        }

        return (
            <tr>
                <th>{this.props.type}</th>
                {sequencerCells}
            </tr>
        );
    }

}

export default SequencerTrack;