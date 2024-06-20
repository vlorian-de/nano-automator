
const { SerialPort } = require('serialport');

const { initializeSerialPort } = require('./service');
const { getFilteredPorts } = require('./list-ports');





getFilteredPorts(SerialPort).then(filteredPorts => {
  
  console.log('Filtered Ports:', filteredPorts);
  const WINDOWS_COM_PORT = filteredPorts[0].path;
  initializeSerialPort(SerialPort, WINDOWS_COM_PORT);

}).catch(err => {
  console.error('Error:', err);
});


