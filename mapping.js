const sampleProfileSwitch = { current: 'VLORIAN TEST' };
const sampleKeydown = { ks: 4, kd: 2 }; // 4 is the key code for the knob???
const sampleKnobTurned = { p: 1 };

function keyDown(keyCode) {
    return (data) => data.ks === keyCode;
}

function macOS() {
    return () => (process.platform === 'darwin')
}

function windows() {
    return () => (process.platform === 'win32')
}

function knobTurned(data) {
    return data.p !== undefined;
}

function setVoulme() {
    (data) => {
        const volume = data.p;
        exec(`osascript -e "set volume output volume ${volume}"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing the command: ${error.message}`);
                return;
            }

            if (stderr) {
                console.error(`Standard error output: ${stderr}`);
                return;
            }

            console.log(`Standard output: ${stdout}`);
        });
    }
}

function macShortcut(data) {
    console.log('Mac shortcut');
}

function lockComputer(data) {
    console.log('Lock computer');
}

function switchToProfile(profile) {
    return () => {
        console.log(`Switching to profile: ${profile}`);
    }
}   

function profileIs(profile) {
    return true;
}

function autoKey(key) {
    console.log(`Autokey: ${key}`);
}

const mappings = [
    {
        condition: [macOS, keyDown(2), profileIs("VLORIAN TEST")],
        action: setVoulme
    },
    { condition: [windows, profileIs("Flo Test")], action: () => autoKey("Mango") },
    { condition: ['D' != 'kk'], action: setVoulme },
    { condition: [macOS, knobTurned], action: macShortcut },
    { condition: [macOS, knobTurned], action: switchToProfile("AA") },
    { condition: [macOS, knobTurned], action: lockComputer },
]