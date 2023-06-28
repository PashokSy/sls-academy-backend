const { pool } = require('../db/connect');

const { NotFoundError } = require('../errors');

/**
 * This function will create new json
 * if it does not already exists or update
 * json data on one with jsonName and pileName
 * @param {string} pileName
 * @param {string} jsonName
 * @param {string} jsonData
 * @returns {Promise<Object>}
 */
async function jsonCreateUpdate(pileName, jsonName, jsonData) {
  let jsonResult;

  try {
    let pile = await pileFindOne(pileName);
    if (!pile) {
      pile = await pileCreate(pileName);
    }

    let json = await jsonFindOne(pileName, jsonName);
    if (!json) {
      json = await pool.query(
        'INSERT INTO jsons(pile_id, json_name, json_data) VALUES ($1, $2, $3) RETURNING *',
        [pile.pile_id, jsonName, jsonData]
      );
    } else {
      json = await pool.query(
        'UPDATE jsons SET json_data = $1 WHERE json_id = $2 AND pile_id = $3 RETURNING *',
        [jsonData, json.json_id, pile.pile_id]
      );
    }

    jsonResult = json.rows[0];
  } catch (error) {
    throw error;
  }

  return jsonResult;
}

/**
 * This function will try to select json data from
 * database and return it or undefined
 * @param {string} pileName
 * @param {string} jsonName
 * @returns {Promise<Object>|undefined}
 */
async function jsonFindOne(pileName, jsonName) {
  let jsonResult;

  try {
    const pile = await pileFindOne(pileName);
    if (pile) {
      const json = await pool.query(
        'SELECT * FROM jsons WHERE json_name = $1 AND pile_id = $2',
        [jsonName, pile.pile_id]
      );

      jsonResult = json.rows[0];
    }
  } catch (error) {
    throw error;
  }

  return jsonResult;
}

/**
 * This function will try to select pile id from database
 * if exists and return its uuid or undefined
 * @param {string} pileName The name of the pile user put
 * @returns {Promise<Object>|undefined}
 */
async function pileFindOne(pileName) {
  let pileResult;

  try {
    const pile = await pool.query('SELECT * FROM piles WHERE pile_name = $1', [
      pileName,
    ]);
    if (pile.rows[0]) {
      pileResult = pile.rows[0];
    }
  } catch (error) {
    throw error;
  }

  return pileResult;
}

/**
 * This function will create a new pile in database
 * and return its uuid
 * @param {string} pileName
 * @returns {Promise<Object>}
 */
async function pileCreate(pileName) {
  let pileResult;

  try {
    const pile = await pool.query(
      'INSERT INTO piles(pile_name) VALUES ($1) RETURNING *',
      [pileName]
    );
    pileResult = pile.rows[0];
  } catch (error) {
    throw error;
  }

  return pileResult;
}

module.exports = { jsonCreateUpdate, jsonFindOne };
