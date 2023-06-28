const { jsonCreateUpdate, jsonFindOne } = require('../utils/queryHelper');

const putJson = async (req, res) => {
  let json;

  try {
    json = await jsonCreateUpdate(
      req.params.pileName,
      req.params.jsonName,
      req.body
    );
  } catch (error) {
    res.status(500).send(error.message);
  }

  res.status(200).send(JSON.parse(json.json_data));
};

const getJson = async (req, res) => {
  let json;

  try {
    json = await jsonFindOne(req.params.pileName, req.params.jsonName);
  } catch (error) {
    res.status(500).send(error.message);
  }

  res.status(200).send(JSON.parse(json.json_data));
};

module.exports = { putJson, getJson };
