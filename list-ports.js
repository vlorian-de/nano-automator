async function getFilteredPorts(serialPort) {
  try {
    const ports = await serialPort.list();
    const filteredPorts = ports.filter(
      port => (port.vendorId === '239a' && port.productId === '8010') ||
              (port.vendorId === '303a' && port.productId === '1001')
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