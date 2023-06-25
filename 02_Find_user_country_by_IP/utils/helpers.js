const fs = require('fs');
const { parse } = require('csv-parse');

function getIp(req) {
  const ipAddress = (
    req.headers['cf-connecting-ip'] ||
    req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    ''
  )
    .split(',')[0]
    .trim();

  return ipAddress;
}

function ipToDecimal(ipAddress) {
  const octets = ipAddress.split('.');
  const ipInDecimal =
    octets[0] * Math.pow(256, 3) +
    octets[1] * Math.pow(256, 2) +
    octets[2] * 256 +
    parseInt(octets[3]);

  return ipInDecimal;
}

function getCountry(ipInDecimal) {
  let country;
  return new Promise((resolve, reject) => {
    fs.createReadStream('./static/IP2LOCATION-LITE-DB1.CSV')
      .pipe(
        parse({
          delimiter: ',',
        })
      )
      .on('data', async (row) => {
        if (
          ipInDecimal === row[0] ||
          ipInDecimal === row[1] ||
          (row[0] < ipInDecimal && ipInDecimal < row[1])
        ) {
          country = row[3];
          resolve(country);
          return;
        }
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

module.exports = { getIp, ipToDecimal, getCountry };
