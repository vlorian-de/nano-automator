const { runCommand } = require("./cross-plattform");


function macShortcut(shortcutName) {
    return () => {
        // See https://support.apple.com/de-de/guide/shortcuts-mac/apd455c82f02/mac
        runCommand(`shortcuts run "${shortcutName}" &`);
    }
}

module.exports = {
    macShortcut,
};  