const Urls = require('../models/urls');
const { shortLinkSaver, getLongUrl } = require('../utils/shortLinkHelper');
const {
  UnsupportedMediaTypeError,
  ConflictError,
  ForbiddenError,
} = require('../errors');

const postLongLink = async (req, res) => {
  if (!req.is('application/json')) {
    throw new UnsupportedMediaTypeError('Provided Media Type Is Unsupported');
  }

  try {
    const newUrls = await shortLinkSaver(req.body.longUrl, req.body.alias);
    const shortLink = `${req.get('host')}/${newUrls.shortUrlAlias}`;

    if (!shortLink) {
      throw new ConflictError('Data Could Not Be Created');
    }

    res.status(201).json({ shortLink: shortLink });
  } catch (error) {
    throw error;
  }
};

const getUrl = async (req, res) => {
  if (req.get('content-type')) {
    throw new ForbiddenError('The request could not be satisfied');
  }

  try {
    const url = await getLongUrl(req.params.shortUrl);
    res.redirect(url);
  } catch (error) {
    throw error;
  }
};

module.exports = { postLongLink, getUrl };
