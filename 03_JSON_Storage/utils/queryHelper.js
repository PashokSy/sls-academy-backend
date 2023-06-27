const { pool } = require('../db/connect');

const putJsonDB = async (pileName, jsonName, jsonData) => {
  let result;

  try {
    let pile = await pool.query(
      'SELECT pile_id FROM piles WHERE pile_name = $1',
      [pileName]
    );
    // if pile does not exists
    if (!pile.rows[0]) {
      pile = await pool.query(
        'INSERT INTO piles(pile_name) VALUES ($1) RETURNING pile_id',
        [pileName]
      );
    }
    const pileId = pile.rows[0].pile_id;

    let newJson = await pool.query(
      'SELECT json_id FROM jsons WHERE json_name = $1',
      [jsonName]
    );
    // if json name does not exists
    if (!newJson.rows[0]) {
      newJson = await pool.query(
        'INSERT INTO jsons(pile_id, json_name, json_data) VALUES ($1, $2, $3) RETURNING json_data',
        [pileId, jsonName, jsonData]
      );
    } else {
      newJson = await pool.query(
        'UPDATE jsons SET json_data = $1 WHERE json_id = $2 RETURNING json_data',
        [jsonData, newJson.rows[0].json_id]
      );
    }

    result = await newJson.rows[0].json_data;
    result = JSON.parse(result);
  } catch (error) {
    throw error;
  }

  return result;
};

module.exports = { putJsonDB };
