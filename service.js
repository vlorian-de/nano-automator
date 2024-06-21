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