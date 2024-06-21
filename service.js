const { ReadlineParser } = require('@serialport/parser-readline');
const { exec } = require('child_process');
const path = require('path');
const { executeMappings } = require('./mapping');
const { mappings } = require('./config');

const AUTOHOTKEY_PATH = '"C:\\Program Files\\AutoHotkey\\UX\\AutoHotkeyUX.exe"';
const PROJECT_DIR = __dirname;



function initializeSerialPort(serialPort, nanoPort) {
  const port = new serialPort({
    path: nanoPort,
    baudRate: 9600,
  });

  const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

  port.on('open', () => {
    console.log('Serial port open');
  });

  parser.on('data', data => {
    try {
      const json = JSON.parse(data);
      executeMappings(mappings, json);
      // if (json.idle !== undefined) {
      //   process.stdout.write(".");
      // } else if (json.current !== undefined) {
      //   console.log(`Current: ${json.current}`);
      // } else if (json.ks !== undefined) {
      //   console.log(`Key States: ks=${json.ks}, kd=${json.kd}, ku=${json.ku}`);
      //   if (json.kd === 1) runAhkScript('undo.ahk');
      //   if (json.kd === 2) runAhkScript('copy.ahk');
      //   if (json.kd === 3) runAhkScript('paste.ahk');
      // } else if (json.p !== undefined) {
      //   console.log(`Setting volume to: ${json.p}`);

      //   // for MacOS
      //   exec(`osascript -e "set volume output volume ${json.p}"`, (error, stdout, stderr) => {
      //     if (error) {
      //       console.error(`Error executing the command: ${error.message}`);
      //       return;
      //     }

      //     if (stderr) {
      //       console.error(`Standard error output: ${stderr}`);
      //       return;
      //     }

      //     console.log(`Standard output: ${stdout}`);
      //   });

      //   // for Windows
      //   runAhkScript('volume-abs.ahk', json.p);
      // } else {
      //   console.log(`Unknown data: ${json}`, json);
      // }
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