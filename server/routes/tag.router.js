const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require("../modules/authentication-middleware");
const { rejectNonAdmin } = require("../modules/authorization-middleware");

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  const queryText = 'SELECT * FROM "tag";';

  pool.query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error in GET tag.router.js", error);
    });
});


router.get("/provider/:id", rejectUnauthenticated, (req, res) => {
  console.log('tag /provider req.query', req.query);
  // ⬇ This will grab the tags that are linked to that provider
  console.log('req.params', req.params)
  const query =
    `SELECT "provider_tag".id, "provider_tag".provider_id, "provider_tag".tag_id, "tag".name, "tag".active
    FROM "provider_tag" 
    JOIN "tag" ON "provider_tag".tag_id = "tag".id
    where "provider_tag".provider_id = $1`;
  pool
    .query(query, [req.params.id])
    .then((result) => {
      res.send(result.rows)
    })
    .catch((err) => {
      console.log("ERROR: Get provider tag", err);
      res.sendStatus(500);
    });
});
/**
 * POST route template
 */
router.post('/new', rejectUnauthenticated, rejectNonAdmin, (req, res) => {
  // POST route code here
  console.log(req.body)
  let queryText = `INSERT INTO "tag"
  ("name")
  VALUES($1);`
  pool.query(queryText, [req.body.name])
    .then(response => {
      //console.log(response.rowCount);
      res.sendStatus(202)
    }).catch(err => {
      console.log('Error in new tag postProvider', err);
      res.sendStatus(500);
    });
});

router.post('/addToProvider', rejectUnauthenticated, rejectNonAdmin, (req, res) => {
  console.log('req.body', req.body);

  let query = `INSERT INTO "provider_tag" ("provider_id", "tag_id")
  VALUES
  `;

  let values = [req.body.id]

  // loops through req.body and makes dynamic query for insert into join table based on how many tags were selected
  for (let i = 0; i < req.body.tagArray.length; i++) {
    query += `($1, $${i + 2})`;
    values.push(req.body.tagArray[i])
    if (i < req.body.tagArray.length - 1) {
      query += `, `;
    }
  }

  console.log('query', query);
  console.log('values', values);

  pool.query(query, values)
    .then(result => {
      res.sendStatus(202);
    }).catch(error => {
      console.log('error in add to provider post', error);
    })
})

router.put('/editProvider', rejectUnauthenticated, rejectNonAdmin, async (req, res) => {
  console.log('req.body', req.body);
  const connection = await pool.connect();

  try {
    await connection.query(`BEGIN;`)

    const deleteQuery = `DELETE FROM "provider_tag"
    WHERE "provider_tag".provider_id = $1
    ;`

    // deletes all tags from provider_tag for this provider
    await connection.query(deleteQuery, [req.body.id])

    let insertNewTagsQuery = `INSERT INTO "provider_tag" ("provider_id", "tag_id")
  VALUES
  `;

    let values = [req.body.id]

    // loops through req.body and makes dynamic query for insert into join table based on how many tags were selected
    for (let i = 0; i < req.body.tagArray.length; i++) {
      insertNewTagsQuery += `($1, $${i + 2})`;
      values.push(req.body.tagArray[i])
      if (i < req.body.tagArray.length - 1) {
        insertNewTagsQuery += `, `;
      }
    }

    console.log('query', insertNewTagsQuery);
    console.log('values', values);

    await connection.query(insertNewTagsQuery, values)

    await connection.query('COMMIT;')
    res.sendStatus(201);

  } catch (error) {

    await connection.query('ROLLBACK;');
    console.log('error in edit provider tags', error)
    res.sendStatus(500);

  } finally {
    connection.release();
  }
})


router.put('/edit',rejectUnauthenticated, (req, res) => {
  console.log(req.body)
let queryText = `UPDATE "tag" SET "name" = $1
                    WHERE id = $2;`
    pool.query(queryText, [req.body.name, req.body.id])
      .then(response => {
          res.sendStatus(202)
      }).catch(err => {
          console.log('Error in edit tag router',err);
          res.sendStatus(500);
      });
});

router.put('/deactivate/', rejectUnauthenticated, (req, res) => {
  const deactivateTagId = req.body.id
  console.log("delete id", deactivateTagId)

  const queryText = `UPDATE "tag" SET "active" = FALSE
                      WHERE id = $1;`;
    pool.query(queryText, [deactivateTagId])
      .then(response => {
          res.sendStatus(202)
      }).catch(err => {
          console.log('Error in delete tag router',err);
          res.sendStatus(500);
      });
});


router.put('/activate/', rejectUnauthenticated, (req, res) => {
  const activateTagId = req.body.id
  console.log("activate id", activateTagId)

  const queryText = `UPDATE "tag" SET "active" = TRUE
                      WHERE id = $1;`;
    pool.query(queryText, [activateTagId])
      .then(response => {
          res.sendStatus(202)
      }).catch(err => {
          console.log('Error in activate tag router',err);
          res.sendStatus(500);
      });
});



module.exports = router;