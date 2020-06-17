const express = require("express");
let { Employee } = require("../model/emp.js");
let ObjectId = require('mongoose').Types.ObjectId;

let router = express.Router();

router.get("/", (req, res) => {
    Employee.find((err, docs) => {
        if (err) {
            console.log("Error! Could not get all employees.");
        } else {
            res.send(docs);
        }
    });
});

router.post("/", (req, res) => {
    console.log(`SUBMIT FOR ${req.body.id}`);

    Employee.find({ id: req.body.id }, (err, docs) => {
        if (err) {
            console.log("Error while finding employee.");
        } else {
            if (docs.length == 0) {
                let emp = new Employee({
                    id: req.body.id,
                    name: req.body.name,
                    remarks: req.body.remarks
                });

                emp.save((err, docs) => {
                    if (!err) {
                        res.send(docs);
                    } else {
                        console.log("Error! Could not add an employee.")
                    }
                });
            } else {
                res.status(400).send("An appraisal for an employee with this ID already exists.");
            }
        }
    });
});

router.put("/:_id", (req, res) => {
    console.log(`UPDATE REQUEST FOR ${req.params._id}.`);

    if (!ObjectId.isValid(req.params._id))
        return res.status(400).send(`No record with given _id : ${req.params._id}`);

    Employee.findById(req.params._id, (err, docs) => {
        if (err || !docs) {
            console.log("Error while updating employee.");
        }

        // if ( docs[0]._id != req.params._id)
        // {
        //     res.status(400).send("An appraisal for an employee with this ID already exists.");
        //     console.log("OOPS");
        // }
        // else
        // {
        let emp = {
            id: req.body.id,
            name: req.body.name,
            remarks: req.body.remarks
        };

        Employee.findByIdAndUpdate(req.params._id, { $set: emp }, { new: true }, (err, doc) => {
            if (err) {
                console.log("Error while updating employee.");
            } else {
                res.send(doc);
            }
        });
        // }
    });
});

router.delete("/:_id", (req, res) => {
    console.log(`DELETE REQUEST FOR ${req.params._id}.`);

    if (!ObjectId.isValid(req.params._id))
        return res.status(400).send(`No record with given _id : ${req.params._id}`);

    Employee.findByIdAndRemove(req.params._id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log("Error while updating employee.");
        }
    });
});

module.exports = router;