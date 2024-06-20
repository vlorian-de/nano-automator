const { ReadlineParser } = require('@serialport/parser-readline');
const { exec } = require('child_process');
const path = require('path');

const AUTOHOTKEY_PATH = '"C:\\Program Files\\AutoHotkey\\UX\\AutoHotkeyUX.exe"';
const PROJECT_DIR = __dirname;

function runAhkScript(scriptName, argument) {
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

function initializeSerialPort(SerialPort, WINDOWS_COM_PORT = '/dev/tty.usbmodem11101') {
  const port = new SerialPort({
    path: WINDOWS_COM_PORT,
    baudRate: 9600,
  });

  const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

  port.on('open', () => {
    console.log('Serial port open');
  });

  parser.on('data', data => {
    try {
      const json = JSON.parse(data);
      if (json.idle !== undefined) {
        process.stdout.write(".");
      } else if (json.current !== undefined) {
        console.log(`Current: ${json.current}`);
      } else if (json.ks !== undefined) {
        console.log(`Key States: ks=${json.ks}, kd=${json.kd}, ku=${json.ku}`);
        if (json.kd === 1) runAhkScript('undo.ahk');
        if (json.kd === 2) runAhkScript('copy.ahk');
        if (json.kd === 3) runAhkScript('paste.ahk');
      } else if (json.p !== undefined) {
        console.log(`Setting volume to: ${json.p}`);
        runAhkScript('volume-abs.ahk', json.p);
      } else {
        console.log(`Unknown data: ${json}`, json);
      }
    } catch (e) {
      console.log(`Error parsing JSON: ${data}`);
    }
  });

  port.on('error', err => {
    console.error('Error: ', err.message);
  });
}

module.exports = {
  initializeSerialPort
};