import {loadSounds} from 'audio/soundLoader';

const soundsMap = {
    "snare" : "/drums/snare.wav",
    "kick"  : "/drums/kick.wav",
    "tom_hi" : "/drums/tom_hi.wav",
    "tom_low" : "/drums/tom_low.wav",
    "hihat_closed" : "/drums/hihat_closed.wav",
    "hihat_open" : "/drums/hihat_open.wav",
    "crash" : "/drums/trash.wav"
};

export default new Promise((resolve, reject) => {
    loadSounds(soundsMap).then(resolve);
});
