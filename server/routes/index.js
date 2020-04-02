const express = require("express")
const db = require("../db")

const router = express.Router();

router.get("/", async (req, res, next) => {

    try {
        let results = await db.all();
        res.json(results)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        let results = await db.one(req.params.id)
        res.json({
            data: results
        })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

router.post("/", async (req, res, next) => {
    try {
        let results = await db.create(req.body.start, req.body.duration, req.body.title)
        res.json({
            data: results
        })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

module.exports = router