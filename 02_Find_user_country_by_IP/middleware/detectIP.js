const { getIp, ipToDecimal, getCountry } = require('../utils/helpers');

const detectIP = async (req, res, next) => {
  const ipAddress = getIp(req);

  const ipInDecimal = ipToDecimal(ipAddress);

  const country = await getCountry(ipInDecimal);

  req.user = { ipAddress: ipAddress, country: country };
  next();
};

module.exports = detectIP;
