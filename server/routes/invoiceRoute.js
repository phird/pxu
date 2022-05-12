import express from 'express';
import db from "../config/database.js";


const router = express.Router();

router.get('/:id', (req, res) => {
    const qID=req.params.id;
    const sqlInvoice = "SELECT * FROM invoice WHERE quotationID=?";

    db.query(sqlInvoice,[qID], (err, result) => {
        console.log(err);
        if (err) throw err;
        res.send(result);
    })
})

export default router;