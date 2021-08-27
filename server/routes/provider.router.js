const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require("../modules/authentication-middleware");
const { rejectNonAdmin } = require("../modules/authorization-middleware");

/**
 * GET activated Providers
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    // GET route code here
    const queryText = `SELECT "provider".program, "provider".website, "provider".address, "provider".city, "provider".state, "provider".zip, "provider".county, "provider".email, "provider".phone, "provider".parent_program, "provider".id, "provider".active, JSON_AGG("tag") as tags FROM "provider" 
    FULL OUTER JOIN "provider_tag" ON "provider_tag".provider_id = "provider".id
    FULL OUTER JOIN "tag" ON "tag".id = "provider_tag".tag_id
    WHERE "provider".active = true 
    GROUP BY "provider".id
    ORDER BY "provider".program
    ;`;
    
    pool.query(queryText)
    .then((result) => {
        res.send(result.rows);
    })
    .catch((error) => {
        console.log("Error in GET provider.router.js", error);
    })
});

router.get("/detail", rejectUnauthenticated, (req, res) => {
    // ⬇ This will grab everything we need to start displaying the patients and the providers they were match with 
    const query =
      `SELECT * from "provider" WHERE "provider".id = $1;`;
    pool
      .query(query, [req.query.q])
      .then((result) => {
        res.send(result.rows)
      })
      .catch((err) => {
        console.log("ERROR: Get provider detail", err);
        res.sendStatus(500);
      });
  });

//GET Deactivated Providers
router.get('/deactivated', rejectUnauthenticated, (req, res) => {
    //GET deactivated Providers
    const queryText = `SELECT "provider".program, "provider".website, "provider".address, "provider".city, "provider".state, "provider".zip, "provider".county, "provider".email, "provider".phone, "provider".parent_program, "provider".id, "provider".active, JSON_AGG("tag") as tags FROM "provider" 
    JOIN "provider_tag" ON "provider_tag".provider_id = "provider".id
    JOIN "tag" ON "tag".id = "provider_tag".tag_id
    WHERE "provider".active = false
    GROUP BY "provider".id
    ORDER BY "provider".program
    ;`;

    pool.query(queryText)
    .then((result) => {
        res.send(result.rows);
    })
    .catch((error) => {
        console.log("Error in GET provider count in  provider.router.js", error);
})
});

router.get('/count', (req, res) => {
    // GET route code here
    const queryText = 'SELECT COUNT(*) as total_providers FROM "provider";';
    
    pool.query(queryText)
    .then((result) => {
        res.send(result.rows);
    })
    .catch((error) => {
        console.log("Error in GET deactivated providers", error);
    })
})

// Add a new provider to provider table
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('post provider req.body', req.body)
    // POST route code here
    const queryText = `INSERT INTO "provider" 
    ("program", "website", 
    "address", "city", "state",
    "zip", "county", "email","phone",
    "parent_program", "empty", 
    "created_by_user_id")
 VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12);`;
    // if (req.isAuthenticated()) {
        pool.query(queryText, [req.body.program,
            req.body.website,
            req.body.address,
            req.body.city,
            req.body.state,
            req.body.zip,
            req.body.county,
            req.body.email,
            req.body.phone,
            req.body.parent_program,
            'null',
            req.user.id])
            .then(results => {
                res.sendStatus(201);
            }).catch(err => {
                console.log('Error in Provider Post', err);
            })
    // } else {
    //     res.sendStatus(403);
    // }
});

//Update a Provider
router.put('/edit', rejectUnauthenticated, rejectNonAdmin, (req, res) => {
    console.log(req.body)
    //let providerId = req.params.id;
    console.log('Provider in router.put is', req.body.id)
    let queryText = `UPDATE "provider" SET "program" = $1,
                    "website" = $2,
                    "address"= $3,
                    "city"= $4,
                    "state"= $5,
                    "zip"= $6,
                    "county"= $7,
                    "email"= $8,
                    "phone"= $9,
                    "parent_program"= $10,
                    "empty"= $11
                    WHERE "provider".id = $12`
    pool.query(queryText, [req.body.program,
            req.body.website,
            req.body.address,
            req.body.city,
            req.body.state,
            req.body.zip,
            req.body.county,
            req.body.email,
            req.body.phone,
            req.body.parent_program,
            'null',
            req.body.id])
        .then(response => {
            //console.log(response.rowCount);
            res.sendStatus(202)
        }).catch(err => {
            console.log('Error in Provider PUT',err);
            res.sendStatus(500);
        });
});


// Toggle Provider Active Status
router.post('/toggle/:id/:boolean', rejectUnauthenticated, rejectNonAdmin, (req, res) => {
    const id = req.params.id;
    const active = req.params.boolean
    const queryText = 'UPDATE provider SET active = $1 WHERE "provider".id = $2;';
    if (req.isAuthenticated) {
        pool.query(queryText, [active, id])
        .then( results => {
            res.sendStatus(201);
        }).catch( err => {
            console.log('Error in Toggle Provider POST', err);
        })
    }
})

/**
 * DELETE route
 */
 router.delete("/delete/:id", rejectUnauthenticated, rejectNonAdmin, (req, res) => {
    // ⬇ This will grab the id of the provider that we would like to delete
    const providerToDelete = req.params.id;
    console.log(providerToDelete);
    // ⬇ This tell the database what we'd like to delete and where
    const queryText = `DELETE CASCADE FROM "provider" WHERE "provider".id = $1`;
    // ⬇ Delete sanitized user input from the database
    pool
      .query(queryText, [providerToDelete])
      // ⬇ Sending back a 'ok' code to the user
      .then((response) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(`error deleting on server side`);
        res.sendStatus(500);
      });
  });

module.exports = router;
