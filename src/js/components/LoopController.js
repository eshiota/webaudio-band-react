// Each beat (1/4 note) has 4 divisions (1/16 notes). A full cycle has
// 32 1/16 notes, which will be called as positions.
//
// Something like this:
//
// - - - - | - - - - | - - - - | - - - - | - - - - | - - - - | - - - - | - - - -
// 0         4         8         12        16        20        24        28   31

import React from 'react';
import {connect} from 'react-redux';

class LoopController extends React.Component {

    constructor (props) {
        super(props)

        this.lastPosition = 31;
        this.updatePositionDuration(this.props.loopSpeed);
    }

    updatePositionDuration (speed) {
        this.positionDuration = 60000 / (speed * 4);
    }

    doLoop () {
        if (!this.props.loopPlaying) {
            return;
        }

        let position = this.props.loopPosition;

        this.props.updateLoopPosition(position === this.lastPosition ? 0 : position + 1)

        setTimeout(this.doLoop.bind(this), this.positionDuration);
    }

    componentDidUpdate (prevProps) {
        if (prevProps.loopSpeed !== this.props.loopSpeed) {
            this.updatePositionDuration(this.props.loopSpeed);
        }

        if (!prevProps.loopPlaying && this.props.loopPlaying) {
            this.doLoop();
        }
    }

    render () {
        return (
            <div className="loop-controller">
                <label>
                    Speed:
                    <input type="number" value={this.props.loopSpeed} onChange={this.props.updateSpeed} />
                </label>

                <div className="loop-controller__buttons">
                    <button onClick={this.props.startLoop}>Start</button>
                    <button onClick={this.props.stopLoop}>Stop</button>
                    <button onClick={this.props.pauseLoop}>Pause</button>
                </div>

                Current position: {this.props.loopPosition}
            </div>
        );
    }

}

LoopController.defaultProps = {
    loopSpeed: 125,
    loopPosition: -1,
    loopPlaying: false
};

function mapStateToProps (state) {
    return {
        loopSpeed: state.loop.speed,
        loopPosition: state.loop.position,
        loopPlaying: state.loop.playing
    };
}

function mapDispatchToProps (dispatch) {
    return {
        startLoop : () => {
            dispatch({
                type: 'START_LOOP'
            });
        },

        stopLoop : () => {
            dispatch({
                type: 'STOP_LOOP'
            });
        },

        pauseLoop : () => {
            dispatch({
                type: 'PAUSE_LOOP'
            });
        },

        updateSpeed : (e) => {
            dispatch({
                type: 'UPDATE_LOOP_SPEED',
                payload: e.target.value
            });
        },

        updateLoopPosition : (value) => {
            dispatch({
                type: 'UPDATE_LOOP_POSITION',
                payload: value
            });
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoopController);
