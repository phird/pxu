import express from 'express';
import db from "../config/database.js";


const router = express.Router();

router.get('/', (req, res) => {
    const sqlQuotation = "SELECT summernote FROM quotation ";
    
    db.query(sqlQuotation, (err, sqlQuotationRe) => {
        if(err) throw err;
        // console.log(sqlQuotationRe);
        res.send(sqlQuotationRe);
    })
})

router.post('/', (req, res) => {
    const data = req.body.summernote;
    const sqlQuotation = "INSERT INTO quotation SET summernote=?";
    
    db.query(sqlQuotation,[data], (err, sqlQuotationRe) => {
        if(err) throw err;
        // console.log(sqlQuotationRe);
        res.send(sqlQuotationRe);
    })
})
// router.get('/:id', (req, res) => {
//     const qID = req.params.id;
//     const sqlQuotation = "SELECT * FROM quotation as q , work as w  WHERE q.workID = w.workID AND q.quotationID = ? ";
//     console.log(qID);
//     db.query(sqlQuotation,[qID], (err, sqlQuotationRe) => {
//         if(err) throw err;
//         console.log(sqlQuotationRe);
//         res.send(sqlQuotationRe);
//     })
// })


// router.delete('/:id', (req, res) => {
//     const qID = req.params.id;
//     const sqlDelete = "DELETE FROM quotation WHERE quotationID=?";
//     db.query(sqlDelete,[qID],(err, sqlQuotation) => {
//         if(err) throw err;
//     })
// })

export default router;