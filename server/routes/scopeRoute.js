import express from 'express';
import db from "../config/database.js";


const router = express.Router();

router.get('/:id', (req, res) => {
    const qID = req.params.id;
    const sql = "SELECT * FROM scope WHERE workID=? ORDER BY scopeID ";
    db.query(sql, [qID], (err, result) => {
        console.log(err);
        if (err) throw err;
        res.send(result);
    })
})

router.post('/', (req, res) => {
    const qID = req.body.qID;
    const text = req.body.text;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const sql = "INSERT INTO `scope`(`workID`, `text`, `price`, `quantity`) VALUES (?,?,?,?)";
    db.query(sql, [
        qID,
        text,
        price,
        quantity,
    ], (err, sqlRe) => {

        if (err)
            console.log(err);
        res.send(sqlRe);
    })
})


export default router;