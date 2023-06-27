const { putJsonDB } = require('../utils/queryHelper');

const putJson = async (req, res) => {
  let jsonData;

  try {
    jsonData = await putJsonDB(
      req.params.pileName,
      req.params.jsonName,
      req.body
    );
  } catch (error) {
    res.status(500).send(error);
  }

  res.status(200).send(jsonData);
};

module.exports = { putJson };
