import {loadSounds} from 'audio/soundLoader';

const soundsMap = {
    "snare" : "/drums_sequencer/snare.wav",
    "kick"  : "/drums_sequencer/kick.wav",
    "tom_hi" : "/drums_sequencer/hitom.wav",
    "tom_low" : "/drums_sequencer/lotom.wav",
    "hihat_closed" : "/drums/hihat_closed.wav",
    "hihat_open" : "/drums_sequencer/ophat.wav",
    "crash" : "/drums/trash.wav"
};

export default new Promise((resolve, reject) => {
    loadSounds(soundsMap).then(resolve);
});
