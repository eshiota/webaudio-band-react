import { createStore, combineReducers } from 'redux';

function loop (state = {}, action) {
    switch (action.type) {
        case 'UPDATE_LOOP_POSITION':
            return Object.assign({}, state, { position: parseInt(action.payload, 10) });
        case 'UPDATE_LOOP_SPEED':
            return Object.assign({}, state, { speed: parseInt(action.payload, 10) });
        case 'START_LOOP':
            return Object.assign({}, state, { playing: true });
        case 'PAUSE_LOOP':
            return Object.assign({}, state, { playing: false });
        case 'STOP_LOOP':
            return Object.assign({}, state, {
                playing: false,
                position: -1
            });
        default:
            return state;
    }
}

function settings (state = {}, action) {
    switch(action.type) {
        case 'UPDATE_SETTINGS_VOLUME':
            return Object.assign({}, state, { volume: parseInt(action.payload, 10) });
        default:
            return state;
    }
}

function instruments (state = [], action) {
    switch(action.type) {
        case 'ADD_INSTRUMENT':
            return state.concat(action.payload);
        case 'UPDATE_INSTRUMENT_STATE':
            return state.map((item) => {
                if (action.payload.id !== item.id) {
                    return item;
                }

                item.state[action.payload.track][action.payload.index] = action.payload.value;

                return item;
            });
        default:
            return state;
    }
}

export default createStore(combineReducers({loop, settings, instruments}));