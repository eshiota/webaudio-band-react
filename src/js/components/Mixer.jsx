import React from 'react';
import {connect} from 'react-redux';

import {updateVolume} from 'audio/mixer';

class Mixer extends React.Component {

    render () {
        updateVolume(this.props.volume);

        return (
            <div className="mixer">
                <label className="mixer__volume control control__volume">
                    Volume:
                    <input type="range" min="0" max="100" step="1" value={this.props.volume} onChange={this.props.updateVolume} />
                </label>

                These are the instruments: {this.props.instruments.map((item, i) => {
                    return item.type;
                })}
            </div>
        );
    }

}

Mixer.defaultProps = {
    volume: 100
};

function mapStateToProps (state) {
    return {
        volume: state.settings.volume,
        instruments: state.instruments
    };
}

function mapDispatchToProps (dispatch) {
    return {
        updateVolume : (e) => {
            dispatch({
                type: 'UPDATE_SETTINGS_VOLUME',
                payload: e.target.value
            });
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Mixer);
