import express from 'express';
import db from "../config/database.js";


const router = express.Router();

router.get('/', (req, res) => {
    const sqlQuotation = "SELECT * FROM quotation WHERE statusquotation != 'Rescinding' order by quotationID DESC";

    db.query(sqlQuotation, (err, sqlQuotationRe) => {
        console.log(err);
        if (err) throw err;
        // console.log(sqlQuotationRe);
        res.send(sqlQuotationRe);
    })
})

router.get('/res', (req, res) => {
    const sqlQuotation = "SELECT * FROM quotation WHERE statusquotation = 'Rescinding' order by quotationID DESC";

    db.query(sqlQuotation, (err, sqlQuotationRe) => {
        console.log(err);
        if (err) throw err;
        // console.log(sqlQuotationRe);
        res.send(sqlQuotationRe);
    })
})

router.put('/qid', (req, res) => {
    const to = '%'+req.body.to+'%';
    const sqlQuotation = "SELECT COUNT(quotationID) as num FROM quotation WHERE quotationID LIKE ? order by quotationID DESC";

    db.query(sqlQuotation,[to], (err, sqlQuotationRe) => {
        console.log(err);
        console.log(to);
        if (err) throw err;
        console.log(sqlQuotationRe);
        res.send(sqlQuotationRe);
    })
})

router.post('/', (req, res) => {
    const qID = req.body.qID;
    const cID = req.body.cID;
    const eID = req.body.eID;
    const statusq = 'Negotiation';
    const qName = req.body.qName;
    const customerstatus = req.body.customerstatus;
    const date = req.body.date;
    const noteq = req.body.noteq;
    const statusw = 'On-Going';
    const qIN = req.body.qIN;
    const vatstatus = req.body.vatstatus;
    const payment = req.body.payment;
    const address = req.body.address;
    const subd = req.body.subd;
    const d = req.body.d;
    const prov = req.body.prov;
    const postcode = req.body.postcode;
    const taxNumber = req.body.taxNumber;
    const companyName = req.body.companyName;
    const estatus = req.body.estatus;
    const summernote = req.body.summernote;
    const sqlQuotation = "INSERT INTO `quotation`(`quotationID`, `customerID`, `employeeID`,`quotationName`,`statusquotation`, `datequotation`, `notequotation`, `statuswork`, `quantityinstallment`, `vatstatus`, `address`, `subdistrict`, `district`, `province`, `postcode`, `taxNumber`, `customerstatus`, `companyName`, `paymentPrice`, `summernote`, `estatus`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(sqlQuotation, [qID,
        cID,
        eID,
        qName,
        statusq,
        date,
        noteq,
        statusw,
        qIN,
        vatstatus,
        address,
        subd,
        d,
        prov,
        postcode,
        taxNumber,
        customerstatus,
        companyName,
        payment,
        summernote,
        estatus
    ], (err, sqlQuotationRe) => {
    
                if (err) {console.log(err); throw err;}
                res.send(sqlQuotationRe);
        })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM quotation WHERE quotationID=?";
    const sqlDeleteinv = "DELETE FROM invoice WHERE quotationID=?";
    const sqlDeletescope = "DELETE FROM scope WHERE workID=?";
    db.query(sqlDelete, [id], (err, result) => {
        db.query(sqlDeleteinv, [id], (err, result) => {
            db.query(sqlDeletescope, [id], (err, result) => {
                console.log(err);
            })
        })
    })
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const qstatus = req.body.quostatus;
    const sqlDelete = "UPDATE quotation SET statusquotation=? WHERE quotationID=?";
    db.query(sqlDelete, [qstatus,id], (err, result) => {
        console.log(err);
    })
});
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