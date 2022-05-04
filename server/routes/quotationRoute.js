import express from 'express';
import db from "../config/database.js";


const router = express.Router();

router.get('/', (req, res) => {
    const sqlQuotation = "SELECT * FROM quotation ";

    db.query(sqlQuotation, (err, sqlQuotationRe) => {
        if (err) throw err;
        // console.log(sqlQuotationRe);
        res.send(sqlQuotationRe);
    })
})

router.post('/', (req, res) => {
    const qID = req.body.qID;
    const cID = req.body.cID;
    const eID = req.body.eID;
    const bID = req.body.bID;
    const statusq = 'Negotiation';
    const date = req.body.date;
    const noteq = req.body.noteq;
    const statusw = 'On-Going';
    const qIN = req.body.qIN;
    const vat = req.body.vat;
    const total = req.body.total;
    const payment = req.body.payment;
    const address = req.body.address;
    const subd = req.body.subd;
    const d = req.body.d;
    const prov = req.body.prov;
    const postcode = req.body.postcode;
    const taxNumber = req.body.taxNumber;
    const stamp = req.body.stamp;
    const companyName = req.body.companyName;
    const estatus = req.body.estatus;
    const summernote = req.body.summernote;
    const sqlQuotation = "INSERT INTO `quotation`(`quotationID`, `customerID`, `employeeID`, `bankID`, `statusquotation`, `datequotation`, `notequotation`, `statuswork`, `quantityinstallment`, `vat`, `address`, `subdistrict`, `district`, `province`, `postcode`, `taxNumber`, `stamp`, `companyName`, `paymentPrice`, `summernote`, `estatus`, `total`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(sqlQuotation, [qID,
        cID,
        eID,
        bID,
        statusq,
        date,
        noteq,
        statusw,
        qIN,
        vat,
        total,
        payment,
        address,
        subd,
        d,
        prov,
        postcode,
        taxNumber,
        stamp,
        companyName,
        estatus,
        summernote], (err, sqlQuotationRe) => {
            if (err) throw err;
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