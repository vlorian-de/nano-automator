
const { knobTurned, macOS, windows, keyDown, profileIs } = require('./conditions/cross-plattform');
const { runCommand, playPause, nextTrack, setVolume, lockComputer } = require('./actions/cross-plattform');
const { autoKey, copy, paste } = require('./actions/windows');
const { macShortcut } = require('./actions/macOS');

const mappings = [
    {
        condition: [knobTurned],
        action: setVolume
    },
    {
        condition: [keyDown(0)],
        action: lockComputer,
    },
    {
        condition: [macOS, keyDown(1)],
        action: macShortcut('Bürolicht an/aus'),
    },
    {
        condition: [macOS, keyDown(2)],
        action: playPause,
    },
    {
        condition: [macOS, keyDown(3)],
        action: nextTrack,
    },
    {
        condition: [windows, keyDown(2)],
        action: copy,
    },
    {
        condition: [windows, keyDown(3)],
        action: paste,
    },
]

module.exports = {
    mappings,
};  