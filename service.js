const { ReadlineParser } = require('@serialport/parser-readline');
const { exec } = require('child_process');
const path = require('path');
const { executeMappings } = require('./mapping');
const { AUTOHOTKEY_PATH, MAPPINGS } = require('./config');

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
      executeMappings(MAPPINGS, json);
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