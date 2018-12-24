import moment from 'moment';
import db from '../db';

async function create(req, res) {
  const text = `INSERT INTO measures
      (name, description, unit)
      VALUES($1, $2, $3)
      returning *`;
  const values = [
    req.body.name,
    req.body.description,
    req.body.unit
  ];

  try {
    const { rows } = await db.query(text, values);
    return res.status(201).json({ measure: rows[0] });
  } catch (error) {
    return res.status(400).send(error);
  }
}

async function getAll(req, res) {
  const findAllQuery = 'SELECT * FROM measures';
  try {
    console.log('here')
    const { rows, rowCount } = await db.query(findAllQuery);
    console.log({rows})
    return res.status(200).json({ measures: rows, count: rowCount });
  } catch (error) {
    return res.status(400).send(error);
  }
}

async function getOne(req, res) {
  const text = 'SELECT * FROM measures WHERE id = $1';
  try {
    const { rows } = await db.query(text, [req.params.id]);
    if (!rows[0]) {
      return res.status(404).send({ 'message': 'measure not found' });
    }
    return res.status(200).send({ measure: rows[0] });
  } catch (error) {
    return res.status(400).send(error)
  }
}

async function update(req, res) {
  const findOneQuery = 'SELECT * FROM measures WHERE id=$1';
  const updateOneQuery = `UPDATE measures
      SET name=$1, description=$2, unit=$3
      WHERE id=$4 returning *`;
  try {
    const { rows } = await db.query(findOneQuery, [req.params.id]);
    if (!rows[0]) {
      return res.status(404).send({ 'message': 'measure not found' });
    }
    const values = [
      req.body.name || rows[0].name,
      req.body.description || rows[0].description,
      req.body.unit || rows[0].unit,
      req.params.id
    ];
    const response = await db.query(updateOneQuery, values);
    return res.status(200).json({ measure: response.rows[0] });
  } catch (err) {
    return res.status(400).send(err);
  }
}

async function remove(req, res) {
  const deleteQuery = 'DELETE FROM measures WHERE id=$1 returning *';
  try {
    const { rows } = await db.query(deleteQuery, [req.params.id]);
    if (!rows[0]) {
      return res.status(404).send({ 'message': 'measure not found' });
    }
    return res.status(204).json({ 'message': 'deleted' });
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = { getAll, getOne, create, update, remove };
