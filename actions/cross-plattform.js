const { exec } = require('child_process');
const { macOS, windows } = require('../conditions/cross-plattform');

const THROTTLE_DELAY = 250;
let lastCallTime = 0;
let throttleTimeout;
let pendingExecution = false;
let lastData;

function setVolume(data) {
    const now = Date.now();

    lastData = data;
    pendingExecution = true;

    const executeFunction = () => {
        if (macOS()) {
            console.log('Setting volume');
            const volume = lastData.p;
            runCommand(`osascript -e "set volume output volume ${volume}"`);
        }
        if (windows()) {
            console.log('Setting volume');
            // runCommand(`nircmd.exe setsysvolume ${volume}`);
            runAhkScript('volume-abs.ahk', lastData.p);
        }
        lastCallTime = Date.now();
        pendingExecution = false;
    };

    if (now - lastCallTime >= THROTTLE_DELAY) {
        if (throttleTimeout) {
            clearTimeout(throttleTimeout);
        }
        executeFunction();
    } else {
        if (!throttleTimeout) {
            throttleTimeout = setTimeout(() => {
                if (pendingExecution) {
                    executeFunction();
                }
                throttleTimeout = null;
            }, THROTTLE_DELAY - (now - lastCallTime));
        }
    }
}

function playPause() {
    if (windows()) {
        runAhkScript('play-pause.ahk');
    }
    if (macOS()) {
        runCommand('osascript -e "tell application \\"Spotify\\" to playpause"');
    }
}

function nextTrack() {
    if (windows()) {
        // runAhkScript('next-track.ahk');
    }
    if (macOS()) {
        runCommand('osascript -e "tell application \\"Spotify\\" to next track"');
    }
}

function runCommand(command) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing the command: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Standard error output: ${stderr}`);
            return;
        }
        if (stdout.length > 0) console.log(`Standard output: ${stdout}`);
    });
}

function lockComputer(data) {
    console.log('Lock computer');
    runCommand('pmset displaysleepnow');
}

function switchToProfile(profile) {
    return () => {
        console.log(`NOT IMPLEMENTED YET: Switching to profile: ${profile}`);
    }
}



function webhook(url) {
    console.log(`NOT IMPLEMENTED YET: Sending webhook to: ${url}`);
}

module.exports = {
    macOS,
    runCommand,
    lockComputer,
    switchToProfile,
    webhook,
    nextTrack,
    setVolume,
    playPause,
};  