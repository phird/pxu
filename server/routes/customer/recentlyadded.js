import express from 'express';
import db from "../config/database.js";

const router = express.Router();

router.get('/recentlyadded', (req, res)=> {

    const sqlSelectRecent = "SELECT * FROM customer"
    db.query(sqlSelectRecent, (err, result) => {
        // console.log(result);
        res.send(result);
    }) 
});

export default router;