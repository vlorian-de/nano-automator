const { SerialPort } = require('serialport');

SerialPort.list().then(
  ports => ports.forEach(port => console.log(port)),
  err => console.error(err)
);
