import context from './context';

const pathPrefix = '/static/sounds';

/**
 * @param {String} key
 * @param {String} url
 * @return {Promise} Resolved with {Object} with the key name and buffer
 */
function loadSound (key, url) {
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();

        request.open('get', `${pathPrefix}${url}`);
        request.responseType = 'arraybuffer';

        request.onload = () => {
            context.decodeAudioData(request.response, (buffer) => {
                resolve({ key, buffer });
            });
        };

        request.send();
    });
}

/**
 * @param {Object} soundsMap
 * @return {Promise} Resolved with {Object} with keys and buffers
 */
function loadSounds (soundsMap) {
    var result = {};

    return new Promise((resolve, reject) => {
        Promise.all(Object.keys(soundsMap).map((sound) => {
            return loadSound(sound, soundsMap[sound]);
        })).then((buffers) => {
            resolve(buffers.reduce((prev, obj) => {
                prev[obj.key] = obj.buffer;
                return prev;
            }, {}));
        });
    });
}

export { loadSound, loadSounds };