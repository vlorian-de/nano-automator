
function macOS() {
    return (process.platform === 'darwin')
}

function windows() {
    return (process.platform === 'win32')
}

function keyDown(keyCode) {
    return ({ kd }) => {
        return kd === keyCode
    };
}

function knobTurned(data) {
    return data.p !== undefined;
}

function profileIs(profile) {
    return () => (true);
}

module.exports = {
    macOS,
    windows,
    keyDown,
    knobTurned,
};  