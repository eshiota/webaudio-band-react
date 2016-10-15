import context from './context';

let exitNode = context.createGain();

exitNode.gain.value = 1;
exitNode.connect(context.destination);

/**
 * @param {Number} volume 0-100
 */
function updateVolume (volume) {
    exitNode.gain.value = volume/100;
}

export { exitNode, updateVolume };
