import express from 'express';
import db from "../config/database.js";


const router = express.Router();

router.get('/:id', (req, res) => {
    const qID=req.params.id;
    const sqlInvoice = "SELECT * FROM invoice WHERE quotationID=? ORDER BY invoiceID ";

    db.query(sqlInvoice,[qID], (err, result) => {
        console.log(err);
        if (err) throw err;
        res.send(result);
    })
})

router.get('/in/:id', (req, res) => {
    const qID=req.params.id;
    const sqlInvoice = "SELECT * FROM invoice as inv JOIN customer as c ON inv.customerID=c.customerID JOIN employee as em ON inv.employeeID=em.employeeID WHERE invoiceID=? ";
    db.query(sqlInvoice,[qID], (err, result) => {
        console.log(err);
        if (err) throw err;
        res.send(result);
    })
})

router.delete('/:id', (req, res) => {
    const qID=req.params.id;
    const sqlInvoice = "DELETE FROM invoice WHERE quotationID=? ";
    db.query(sqlInvoice,[qID], (err, result) => {
        console.log(err);
        if (err) throw err;
        res.send(result);
    })
})

router.post('/', (req, res) => {
    const inID = req.body.inID;
    const qID = req.body.qID;
    const cID = req.body.cID;
    const eID = req.body.eID;
    const statusin = 'INCOMPLETE';
    const customerstatus = req.body.customerstatus;
    const num = req.body.num;
    const vatstatus = req.body.vatstatus;
    const payment = req.body.payment;
    const address = req.body.address;
    const subd = req.body.subd;
    const d = req.body.d;
    const prov = req.body.prov;
    const postcode = req.body.postcode;
    const taxNumber = req.body.taxNumber;
    const companyName = req.body.companyName;
    const companyNumber = req.body.companyNumber;
    const estatus = req.body.estatus;
    const sqlInvoice = "INSERT INTO `invoice`(`invoiceID`,`quotationID`, `customerID`, `employeeID`,`statusinvoice`, `numberinstallment`, `vatstatus`, `address`, `subdistrict`, `district`, `province`, `postcode`, `taxNumber`, `customerstatus`, `wcompanyName`,`wcompanyNumber`, `priceINV`, `estatus`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(sqlInvoice, [
        inID,
        qID,
        cID,
        eID,
        statusin,
        num,
        vatstatus,
        address,
        subd,
        d,
        prov,
        postcode,
        taxNumber,
        customerstatus,
        companyName,
        companyNumber,
        payment,
        estatus
    ], (err, sqlInvoiceRe) => {

            if (err) 
            console.log(err);
            console.log(sqlInvoiceRe);
            res.send(sqlInvoiceRe);
        })
})

router.post('/:id', (req, res) => {
    const inID = req.params.id;
    const bID = req.body.bankID;
    const dateinv = req.body.dateinv;
    const sqlInvoice = "UPDATE `invoice` SET bankID=?,dateinvoice=? WHERE invoiceID=?";
    db.query(sqlInvoice, [
        bID,
        dateinv,
        inID,
    ], (err, sqlInvoiceRe) => {

            if (err) 
            console.log(err);
            console.log(sqlInvoiceRe);
            res.send(sqlInvoiceRe);
        })
})

export default router;