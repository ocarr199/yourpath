const express = require("express");
const { rejectUnauthenticated } = require("../modules/authentication-middleware");
const { rejectNonAdmin } = require("../modules/authorization-middleware");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
// grabs provider matches for ONE patient (fetchPatientDetail)
router.get("/", rejectUnauthenticated, (req, res) => {
  // ⬇ This will grab everything we need to start displaying the patients and the providers they were match with 
  const query =
    `SELECT ARRAY_AGG(DISTINCT("tag".name)) as tags, ARRAY_AGG(DISTINCT("tag".id)) as tags_id, "patient_provider".provider_id, "patient_provider".patient_id, "patient".active, "program", "website", "address", "city", "state", "zip", "county",
    "phone", "website", "email", "parent_program" FROM "provider" 
     LEFT JOIN "patient_provider" ON "patient_provider".provider_id = "provider".id
     LEFT JOIN "patient" ON "patient".id = "patient_provider".patient_id
     LEFT JOIN "provider_tag" ON "provider_tag".provider_id = "provider".id
     LEFT JOIN "tag" ON "tag".id = "provider_tag".tag_id
     WHERE "patient_provider".patient_id = $1
     GROUP BY "patient_provider".provider_id, "patient_provider".patient_id, "patient".active, "provider".program, "provider".website, "provider".address, "provider".city, "provider".state, "provider".zip, "provider".county, "provider".phone, "provider".website, "provider".email, "provider".parent_program;`;
  pool
    .query(query, [req.query.q])
    .then((result) => {
        res.send(result.rows)
      
    })
    .catch((err) => {
      console.log("ERROR: Get patient detail", err);
      res.sendStatus(500);
    });
});

router.get("/client", (req, res) => {
  console.log(req.query)
  console.log(req.query.id)
  console.log(req.query.token)
  // ⬇ This will grab everything we need to start displaying the patients and the providers they were match with 
  const query =
    `SELECT ARRAY_AGG(DISTINCT("tag".name)) as tags, ARRAY_AGG(DISTINCT("tag".id)) as tags_id, "patient_provider".provider_id, "patient_provider".patient_id, "patient".active, "program", "website", "address", "city", "state", "zip", "county",
    "phone", "website", "email", "parent_program" FROM "provider" 
     LEFT JOIN "patient_provider" ON "patient_provider".provider_id = "provider".id
     LEFT JOIN "patient" ON "patient".id = "patient_provider".patient_id
     LEFT JOIN "provider_tag" ON "provider_tag".provider_id = "provider".id
     LEFT JOIN "tag" ON "tag".id = "provider_tag".tag_id
     WHERE "patient_provider".patient_id = $1
     AND
     "patient".token = $2
     GROUP BY "patient_provider".provider_id, "patient_provider".patient_id, "patient".active, "provider".program, "provider".website, "provider".address, "provider".city, "provider".state, "provider".zip, "provider".county, "provider".phone, "provider".website, "provider".email, "provider".parent_program;`;
  pool
    .query(query, [req.query.id, req.query.token])
    .then((result) => {
        res.send(result.rows)
      
    })
    .catch((err) => {
      console.log("ERROR: Get patient detail", err);
      res.sendStatus(500);
    });
});

// get request for EITHER all ACTIVE or all INACTIVE patients for Patient page (page 6 in scope doc)
router.get("/all", rejectUnauthenticated, (req, res) => {
  console.log('req.query', req.query);
  // add in if statement to check if req.query cotains patient.active information. return 400 or 401? if it does not
  // ⬇ This will grab everything we need to start displaying the patients and the providers they were match with 
  const queryText = `SELECT "patient".id, "patient".active, "patient".auto_recs_needed, ARRAY_AGG(DISTINCT("tag".name)) as tags, ARRAY_AGG(DISTINCT("tag".id)) as tags_id, ARRAY_AGG(DISTINCT("provider".program)) as providers FROM "patient"
  LEFT JOIN "patient_provider" ON "patient_provider".patient_id = "patient".id
  LEFT JOIN "provider" ON "provider".id = "patient_provider".provider_id
  JOIN "patient_tag" ON "patient_tag".patient_id = "patient".id
  JOIN "tag" ON "tag".id = "patient_tag".tag_id
  WHERE "patient".active = $1
  GROUP BY "patient".id
  ORDER BY "patient".id ASC
  ;
  `;
  pool
    .query(queryText, [req.query.active])
    .then((result) => {
      res.send(result.rows)
    })
    .catch((err) => {
      console.log("ERROR: Get all patients", err);
      res.sendStatus(500);
    });
});

router.get("/allDeactive", rejectUnauthenticated, (req, res) => {
  // ⬇ This will grab everything we need to start displaying the patients and the providers they were match with 
  const queryText = ` SELECT * from "patient" WHERE "active" = false;`;
  pool
    .query(queryText)
    .then((result) => {
      console.log('ALL DEACTIVE RESULT', result.rows)
      res.send(result.rows)
    })
    .catch((err) => {
      console.log("ERROR: Get all deactive patients", err);
      res.sendStatus(500);
    });
});

router.get("/recommendationNeeded", rejectUnauthenticated, (req, res) => {
  // ⬇ This will grab everything we need to start displaying the patients and the providers they were match with 
  const queryText = `SELECT * FROM "patient"
  WHERE "bucket_id" = 1;
  `;
  pool
    .query(queryText)
    .then((result) => {
        res.send(result.rows)
    })
    .catch((err) => {
        console.log("ERROR: Get recommendations needed", err);
        res.sendStatus(500);
    });
});

router.get("/count", rejectUnauthenticated, (req, res) => {
  // ⬇ This will grab everything we need to start displaying the patients and the providers they were match with 
  const queryText = `SELECT COUNT("patient".id) as total_patients FROM "patient";
  `;
  pool
    .query(queryText)
    .then((result) => {
        res.send(result.rows)
    })
    .catch((err) => {
        console.log("ERROR: Get patient count", err);
        res.sendStatus(500);
    });
});

/**
 * POST route template
 */
// post new patient
router.post("/", rejectUnauthenticated, async (req, res) => {
  console.log('req.body', req.body);
  const connection = await pool.connect();

  try {
    await connection.query(`BEGIN;`)

    // first query
    const patientQuery = `INSERT INTO "patient" ("bucket_id", "created_by_user_id")
  VALUES (DEFAULT, $1)
  RETURNING "id";`;
    // first query: insert new patient with user id into patient table
    const patientQueryResult = await connection.query(patientQuery, [req.user.id])
    console.log('result.rows', patientQueryResult.rows[0].id);
    const patientId = patientQueryResult.rows[0].id

    // first part of dynamic query. always there.
    let patientTagQuery = `INSERT INTO "patient_tag" ("patient_id", "tag_id")
    VALUES`;

    // for dynamic query
    let count = 1;
    let values = [patientId]

    // loops through req.body and makes dynamic query for insert into join table based on how many tags were selected
    for (let i = 0; i < req.body.length; i++) {
      count += 1;
      patientTagQuery += `($1, $${count})`;
      values.push(req.body[i].tag_id)
      if (i < req.body.length - 1) {
        patientTagQuery += `, `;
      }
    }
    // logs
    // console.log('query', patientTagQuery);
    // console.log('count', count);
    // console.log('values', values);

    // run second query: dynamic query
    await connection.query(patientTagQuery, values)

    await connection.query('COMMIT;')
    res.sendStatus(201);

  } catch (error) {
    await connection.query('ROLLBACK;');
    console.log('error in new patient post', error)
    res.sendStatus(500);

  } finally {
    connection.release();
  }
});




/**
 * POST route generate provider recommendations
 */

router.post('/generate', rejectUnauthenticated, async (req, res) => {
  console.log("generate router req.body", req.body);
  const connection = await pool.connect();

  try {
    await connection.query(`BEGIN;`)

    // inserts patient id and provider id into patient provider table where the patient id matches $1 and
    // the provider tag matches the patient tag
    const providerQuery = `INSERT INTO "patient_provider" ("patient_id", "provider_id")
    SELECT $1, "provider".id FROM "provider"
    JOIN "provider_tag" ON "provider_tag".provider_id = "provider".id
    WHERE "provider_tag".tag_id = $2;`;

    // loops through array of tag_ids coming from req.body.
    // runs query above every time to insert patient/provider tag matches for each patient tag
    for (let i=0; i<req.body.tags_id.length; i++){
      await connection.query(providerQuery, [req.body.id, req.body.tags_id[i]])
      console.log('worked!', req.body.id, req.body.tags_id[i]);
    }

    await connection.query('COMMIT;')
    res.sendStatus(201);

  } catch (error) {
    await connection.query('ROLLBACK;');
    console.log('error in generate matches post', error)
    res.sendStatus(500);

  } finally {
    connection.release();
  }
})

/**
 * DELETE route
 */
router.delete("/delete", rejectUnauthenticated, (req, res) => {
  // ⬇ This will grab the id of the task that we would like to delete
  console.log(req.query);
  const patientID = req.query.patient_id;
  const providerID = req.query.provider_id
  // ⬇ This tell the database what we'd like to delete and where
  const queryText = `DELETE FROM "patient_provider" WHERE "patient_id" = $1 AND "provider_id" = $2;`;
  // ⬇ Delete sanitized user input from the database
  pool
    .query(queryText, [patientID, providerID])
    // ⬇ Sending back a 'ok' code to the user
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`error deleting on server side`);
      res.sendStatus(500);
    });
});

/**
 * EDIT ROUTE: toggle active status
 */
router.put(`/toggleactive/:id`, rejectUnauthenticated, (req, res) => {
  console.log('active req.body', req.body);

  const query = `UPDATE "patient"
  SET "active" = $1
  WHERE "id" = $2;
  `;

  pool.query(query, [!req.body.active, req.body.id])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log('error in deactivate patient', error);
      res.sendStatus(500);
    })
})

router.put('/token', rejectUnauthenticated, (req, res) => {
  const queryText = `UPDATE "patient" SET "token" = $1 WHERE id = $2;`;
  console.log()
  pool.query(queryText, [req.body.token, req.body.id])
  .then(result => {
    res.sendStatus(201);
  }).catch(err => {
    console.log('Error in Provider Post', err);
    res.sendStatus(500);
  })
})
module.exports = router;
