import moment from 'moment';
import db from '../database';

async function create(req, res) {
  const text = `INSERT INTO exercises
      (name, description, equipment, type, measure)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
  const values = [
    req.body.name,
    req.body.description,
    req.body.equipment,
    req.body.type,
    req.body.measure,
  ];

  try {
    const { rows } = await db.query(text, values);
    return res.status(201).json({ exercise: rows[0] });
  } catch (error) {
    return res.status(400).send(error);
  }
}

async function getAll(req, res) {
  const findAllQuery = 'SELECT * FROM exercises';
  try {
    const { rows, rowCount } = await db.query(findAllQuery);
    return res.status(200).json({ exercises: rows, count: rowCount });
  } catch (error) {
    return res.status(400).send(error);
  }
}

async function getOne(req, res) {
  const text = 'SELECT * FROM exercises WHERE id = $1';
  try {
    const { rows } = await db.query(text, [req.params.id]);
    if (!rows[0]) {
      return res.status(404).send({ 'message': 'exercise not found' });
    }
    return res.status(200).send({ exercise: rows[0] });
  } catch (error) {
    return res.status(400).send(error)
  }
}

async function getOnePlanned(req, res) {
  const text = `SELECT
    exercises.id,
    exercises.name,
    exercises.description,
    repetitions,
    sets,
    weight,
    duration,
    type,
    measure
    FROM planned_workouts
    JOIN planned_workouts_exercises on planned_workouts_exercises.planned_workouts_id = planned_workouts.id
    JOIN exercises on exercises.id = planned_workouts_exercises.exercise_id
    WHERE planned_workouts.id = $1
    AND exercises.id = $2`;
  try {
    const { rows } = await db.query(text, [req.params.sessionId, req.params.exerciseId]);
    if (!rows.length) {
      return res.status(404).send({ 'message': 'exercise not found' });
    }
    return res.status(200).send({ exercise: rows[0] });
  } catch (error) {
    return res.status(400).send(error)
  }
}

async function update(req, res) {
  const findOneQuery = 'SELECT * FROM exercises WHERE id=$1';
  const updateOneQuery = `UPDATE exercises
      SET name=$1, description=$2, equipment=$3, type=$4, measure=$5
      WHERE id=$6 returning *`;
  try {
    const { rows } = await db.query(findOneQuery, [req.params.id]);
    if (!rows[0]) {
      return res.status(404).send({ 'message': 'exercise not found' });
    }
    const values = [
      req.body.name || rows[0].name,
      req.body.description || rows[0].description,
      req.body.equipment || rows[0].equipment,
      req.body.type || rows[0].type,
      req.body.measure || rows[0].measure,
      req.params.id
    ];
    const response = await db.query(updateOneQuery, values);
    return res.status(200).json({ exercise: response.rows[0] });
  } catch (err) {
    return res.status(400).send(err);
  }
}

async function remove(req, res) {
  const deleteQuery = 'DELETE FROM exercises WHERE id=$1 returning *';
  try {
    const { rows } = await db.query(deleteQuery, [req.params.id]);
    if (!rows[0]) {
      return res.status(404).send({ 'message': 'exercise not found' });
    }
    return res.status(204).json({ 'message': 'deleted' });
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = { getAll, getOne, getOnePlanned, create, update, remove };
