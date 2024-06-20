async function getFilteredPorts(serialPort) {
  try {
    const ports = await serialPort.list();
    console.log(ports);
    const filteredPorts = ports.filter(
      (port => port.vendorId === '239a' && port.productId === '8010') ||
      (port => port.vendorId === '303a' && port.productId === '1001')
    );
    return filteredPorts;
  } catch (err) {
    console.error('Error listing ports:', err);
    return [];
  }
}

module.exports = {
  getFilteredPorts
};