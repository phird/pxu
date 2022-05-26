import express from 'express';
import db from "../config/database.js";


const router = express.Router();

router.get('/', (req, res) => {
    const sqlQuotation = "SELECT * FROM quotation WHERE statusquotation != 'Rescinding' order by id DESC";

    db.query(sqlQuotation, (err, sqlQuotationRe) => {
        console.log(err);
        if (err) throw err;
        // console.log(sqlQuotationRe);
        res.send(sqlQuotationRe);
    })
})

router.get('/ongoing', (req, res) => {
    const sqlQuotation = "SELECT * FROM quotation WHERE statuswork = 'On-Going' order by id DESC";

    db.query(sqlQuotation, (err, sqlQuotationRe) => {
        console.log(err);
        if (err) throw err;
        // console.log(sqlQuotationRe);
        res.send(sqlQuotationRe);
    })
})

router.get('/done', (req, res) => {
    const sqlQuotation = "SELECT * FROM quotation WHERE statuswork = 'Done' order by id DESC";

    db.query(sqlQuotation, (err, sqlQuotationRe) => {
        console.log(err);
        if (err) throw err;
        // console.log(sqlQuotationRe);
        res.send(sqlQuotationRe);
    })
})

router.get('/res', (req, res) => {
    const sqlQuotation = "SELECT * FROM quotation WHERE statusquotation = 'Rescinding' order by id DESC";

    db.query(sqlQuotation, (err, sqlQuotationRe) => {
        console.log(err);
        if (err) throw err;
        // console.log(sqlQuotationRe);
        res.send(sqlQuotationRe);
    })
})

router.put('/qid', (req, res) => {
    const to = '%'+req.body.to+'%';
    const sqlQuotation = "SELECT COUNT(quotationID) as num FROM quotation WHERE quotationID LIKE ? order by id DESC";

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
    const total = req.body.total;
    const address = req.body.address;
    const subd = req.body.subd;
    const d = req.body.d;
    const prov = req.body.prov;
    const postcode = req.body.postcode;
    const taxNumber = req.body.taxNumber;
    const companyName = req.body.companyName;
    const companyNumber = req.body.companyNumber;
    const estatus = req.body.estatus;
    const summernote = req.body.summernote;
    const sqlQuotation = "INSERT INTO `quotation`(`quotationID`, `customerID`, `employeeID`,`quotationName`,`statusquotation`, `datequotation`, `notequotation`, `statuswork`, `quantityinstallment`, `vatstatus`, `address`, `subdistrict`, `district`, `province`, `postcode`, `taxNumber`, `customerstatus`, `wcompanyName`,`wcompanyNumber`, `paymentPrice`,`totalpricequo`, `summernote`, `estatus`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
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
        companyNumber,
        payment,
        total,
        summernote,
        estatus
    ], (err, sqlQuotationRe) => {
    
                if (err) {console.log(err); throw err;}
                console.log(payment);
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

router.get('/quo/:id', (req, res) => {
    const qID=req.params.id;
    const sqlQuotation = "SELECT * FROM quotation as quo JOIN customer as c ON quo.customerID=c.customerID  JOIN employee as em ON quo.employeeID=em.employeeID  WHERE quotationID=? ";
    db.query(sqlQuotation,[qID], (err, result) => {
        console.log(err);
        if (err) throw err;
        res.send(result);
    })
})

router.get('/quoScope/:id', (req, res) => {
    const qID=req.params.id;
    const sqlQuotation = "SELECT summernote FROM quotation as quo WHERE quotationID=? ";
    db.query(sqlQuotation,[qID], (err, result) => {
        console.log(err);
        if (err) throw err;
        res.send(result);
    })
})

router.get('/quo/detail/:id', (req, res)=>{
    const qID = req.params.id;
    const sqlDetail = "SELECT name, quantity, price  FROM scope as sc WHERE sc.workID=?"
    db.query(sqlDetail,[qID], (err, result) =>{
        console.log(err);
        if (err ) throw err;
        res.send(result);
    })
})

router.get('/quo/checkstatus/:id', (req,res) =>{
    const qID = req.params.id;
    const sqlStatus = "SELECT statusquotation FROM quotation as quo WHERE quo.quotationID =? ";
    db.query(sqlStatus, [qID], (err, result) =>{
        console.log(err);
        if(err) throw err;
        res.send(result);
    })
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const qstatus = req.body.quostatus;
    const sqlDelete = "UPDATE quotation SET statusquotation=? WHERE quotationID=?";
    db.query(sqlDelete, [qstatus,id], (err, result) => {
        console.log(err);
        console.log(result);
    })
});

router.get('/:id', (req, res) => {
    const qID = req.params.id;
    const sqlQuotation = "SELECT * FROM quotation as q  WHERE q.quotationID = ? ";
    console.log(qID);
    db.query(sqlQuotation,[qID], (err, sqlQuotationRe) => {
        if(err) throw err;
        console.log(sqlQuotationRe);
        res.send(sqlQuotationRe);
    })
})

router.post('/:id', (req, res) => {
    const qID = req.params.id;
    const eID = req.body.eID;
    const qName = req.body.qName;
    const date = req.body.date;
    const noteq = req.body.noteq;
    const qIN = req.body.qIN;
    const vatstatus = req.body.vatstatus;
    const total = req.body.total;
    const payment = req.body.payment;
    const estatus = req.body.estatus;
    const summernote = req.body.summernote;
    const sqlQuotation = "UPDATE `quotation` SET `employeeID`=?,`quotationName`=?, `datequotation`=?, `notequotation`=?, `quantityinstallment`=?,`vatstatus`=?, `paymentPrice`=?,`totalpricequo`=?, `summernote`=?, `estatus`=? WHERE quotationID=?";
    db.query(sqlQuotation, [
        eID,
        qName,
        date,
        noteq,
        qIN,
        vatstatus,
        payment,
        total,
        summernote,
        estatus,
        qID,
    ], (err, sqlQuotationRe) => {
    
                if (err) {console.log(err); throw err;}
                console.log(sqlQuotationRe);
                console.log(payment);
                res.send(sqlQuotationRe);
        })
})


export default router;