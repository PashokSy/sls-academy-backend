const { jsonCreateUpdate, jsonFindOne } = require('../utils/queryHelper');
const {
  UnsupportedMediaType,
  ConflictError,
  NotFoundError,
  ForbiddenError,
} = require('../errors');

const putJson = async (req, res) => {
  let json;

  if (!req.is('application/json')) {
    throw new UnsupportedMediaType('Provided Media Type Is Unsupported');
  }

  try {
    json = await jsonCreateUpdate(
      req.params.pileName,
      req.params.jsonName,
      req.body
    );
  } catch (error) {
    throw error;
  }

  if (!json) throw new ConflictError('Data Could Not Be Created');

  res.status(200).send(JSON.parse(json.json_data));
};

const getJson = async (req, res) => {
  let json;

  if (req.get('content-type')) {
    throw new ForbiddenError('The request could not be satisfied');
  }

  try {
    json = await jsonFindOne(req.params.pileName, req.params.jsonName);
  } catch (error) {
    throw error;
  }

  if (!json) throw new NotFoundError('Data Not Found');

  res.status(200).send(JSON.parse(json.json_data));
};

module.exports = { putJson, getJson };
