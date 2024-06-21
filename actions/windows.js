const path = require('path');
const { runCommand } = require('./cross-plattform');

function autoHotKey(scriptName, argument) {
    // Path to the AutoHotKey script in the 'ahk-scripts' subfolder
    const scriptPath = path.join(PROJECT_DIR, 'ahk-scripts', scriptName);

    // Command to start the AutoHotKey script
    const command = `${AUTOHOTKEY_PATH} "${scriptPath}" ${argument}`;

    // Execute the command
    runCommand(command);
}

function copy() {
    autoHotKey('copy.ahk');
}

function paste() {
    autoHotKey('paste.ahk');
}

function undo() {
    autoHotKey('undo.ahk');
}

module.exports = {
    autoHotKey,
    copy,
    paste,
    undo,
};  