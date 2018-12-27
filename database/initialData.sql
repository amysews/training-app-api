INSERT INTO measures (name, description, unit)
VALUES ('weight', 'Body weight measured without shoes', 'kg');

INSERT INTO measurements (measure_id, date, value)
VALUES (1, now(), 66);

INSERT INTO exercises (name, description, equipment, type, measure)
VALUES ('squat', 'How low can you go...', 'none', 'full body', 'quantity'), 
('plank', 'Hold plank position...', 'none', 'full body', 'duration'), 
('side plank', 'Alternating sides, hold side plank', 'none', 'full body', 'duration');

INSERT INTO planned_workouts (name, description)
VALUES ('Full body 1', 'Description of full body 1'), ('Full body 2', 'Description of full body 2'), ('Upper body', 'Description of upper body');

INSERT INTO planned_workouts_exercises (planned_workouts_id, exercise_id, repetitions, sets, weight, duration)
VALUES (1, 1, 10, 3, 12, 0), (1, 2, 1, 3, 0, 30), (1, 3, 2, 3, 0, 30),
(2, 1, 10, 3, 12, 0), (2, 2, 1, 3, 0, 30), (2, 3, 2, 3, 0, 30),
(3, 1, 10, 3, 12, 0), (3, 2, 1, 3, 0, 30), (3, 3, 2, 3, 0, 30);

INSERT INTO completed_workouts (date)
VALUES (NOW());

INSERT INTO completed_workouts_exercises (completed_workouts_id, exercise_id, repetitions, sets, weight, duration)
VALUES (1, 1, 10, 3, 12, 0);
