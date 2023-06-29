const crypto = require('crypto');
const URL = require('url').URL;

const Urls = require('../models/urls');

const { BadRequestError, ForbiddenError } = require('../errors');

/**
 * This function will save long link and generated or provided short link alias
 * and return saved json
 * @param {string} longUrl - A string param
 * @param {string} alias - An optional param
 * @returns {Promise<Document<mongoose.Model>>} Promise with Document contains mongoose model of Urls
 */
async function shortLinkSaver(longUrl) {
  let urls;

  try {
    linkValidation(longUrl);
    const aliasValid = await aliasValidation(arguments[1]);
    if (aliasValid) {
      const alias = arguments[1];
      urls = providedAliasSave(longUrl, alias);
    } else {
      urls = generatedAliasSave(longUrl);
    }
  } catch (error) {
    throw error;
  }
  return urls;
}

/**
 * This function will save long url with provided short link alias
 * if available or throw error if taken
 * @param {string} longUrl - A string param
 * @param {string} shortUrlAlias - A string param
 * @returns {Promise<Document<mongoose.Model>>} Promise with Document contains mongoose model of Urls
 */
async function providedAliasSave(longUrl, shortUrlAlias) {
  let urls;

  try {
    shortUrlAlias = shortUrlAlias.trim();
    urls = createUrls(longUrl, shortUrlAlias, true);
  } catch (error) {
    throw error;
  }
  return urls;
}

/**
 * This function will save long url with generated short link alias
 * if available or throw error if taken
 * @param {string} longUrl - A string param
 * @returns {Promise<Document<mongoose.Model>>} Promise with Document contains mongoose model of Urls
 */
async function generatedAliasSave(longUrl) {
  let urls;

  try {
    const foundUrls = await Urls.findOne({
      longUrl: longUrl,
      aliasProvided: false,
    });
    if (!foundUrls) {
      const shortUrlAlias = await aliasGenerator();
      urls = createUrls(longUrl, shortUrlAlias, false);
    } else {
      urls = foundUrls;
    }
  } catch (error) {
    throw error;
  }

  return urls;
}

/**
 * This function will generate random not taken short url alias
 * and returns it
 * @returns {Promise<string>} generated short url alias
 */
async function aliasGenerator() {
  try {
    const generatedAlias = crypto.randomBytes(4).toString('hex');
    const foundUrls = await Urls.find({ shortUrlAlias: generatedAlias });
    if (foundUrls.length === 0) {
      return generatedAlias;
    } else {
      return aliasGenerator();
    }
  } catch (error) {
    throw error;
  }
}

/**
 * This function will create url in database
 * and return saved json
 * @param {string} longUrl - A string param
 * @param {string} shortUrlAlias - A string param
 * @param {boolean} aliasProvided - A boolean param
 * @returns {Promise<Document<mongoose.Model>>} Promise with Document contains mongoose model of Urls
 */
async function createUrls(longUrl, shortUrlAlias, aliasProvided) {
  let urls;

  try {
    urls = await Urls.create({
      longUrl: longUrl,
      shortUrlAlias: shortUrlAlias,
      aliasProvided: aliasProvided,
    });
  } catch (error) {
    throw error;
  }

  return urls;
}

async function aliasValidation(alias) {
  try {
    // alias not in input json
    if (typeof alias === 'undefined') {
      return false;
    }

    // alias string type check
    if (typeof alias != 'string') {
      throw new BadRequestError('Provided Alias is Invalid');
    }

    // alias empty string check
    if (alias.trim().length === 0) {
      throw new BadRequestError('Provided Alias is Invalid');
    }

    // alias taken check
    const findUrls = await Urls.find({ shortUrlAlias: alias });
    if (findUrls.length != 0) {
      throw new ForbiddenError('Provided Alias is Taken');
    }
  } catch (error) {
    throw error;
  }

  return true;
}

/**
 * This function will check if url is valid
 * and throw an error if not
 * @param {string} longUrl
 */
function linkValidation(longUrl) {
  try {
    new URL(longUrl);
  } catch (error) {
    throw new BadRequestError('Provided URL is Invalid');
  }
}

module.exports = shortLinkSaver;
