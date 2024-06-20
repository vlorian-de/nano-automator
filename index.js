const { SerialPort } = require('serialport');
const { initializeSerialPort } = require('./service');
const { getFilteredPorts } = require('./list-ports');

async function main() {
  try {
    const filteredPorts = await getFilteredPorts(SerialPort);
    console.log('Filtered Ports:', filteredPorts);
    if (filteredPorts.length === 0) {
      console.error('No Nano_D++ found');
      return;
    }
    const nanoPort = filteredPorts[0].path;
    initializeSerialPort(SerialPort, nanoPort);
  } catch (err) {
    console.error('Error:', err);
  }
}

main();