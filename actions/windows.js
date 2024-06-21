const path = require('path');

function autoHotKey(scriptName, argument) {
    // Path to the AutoHotKey script in the 'ahk-scripts' subfolder
    const scriptPath = path.join(PROJECT_DIR, 'ahk-scripts', scriptName);

    // Command to start the AutoHotKey script
    const command = `${AUTOHOTKEY_PATH} "${scriptPath}" ${argument}`;

    // Execute the command
    exec(command, (error, stdout, stderr) => {
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

function copy() {
    autoHotKey('copy.ahk');
}

function paste() {
    autoHotKey('paste.ahk');
}


module.exports = {
    autoHotKey,
    copy,
    paste,
};  