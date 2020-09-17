const express = require('express');
const router = express.Router();
const { Test } = require('../models/Test');

router.get('/', function(req, res) {
    Test.find().exec(function(err, test) {
        if (err) {
            console.log(err);
            return;
        } else {
            res.json(test);
            return;
        }
    });
});

router.post('/add', function(req, res) {
    let test = new Test(req.body);
    test.save().then(test => {
        res.status(200).json({'test': 'test added successfully'});
    }).catch(err => {
        res.status(400).send('adding new test failed');
    });
});

router.post('/update/:id', function(req, res) {
    Test.findById(req.params.id, function(err, test) {
        if (!test) {
            res.status(404).send('data is not found');
        } else {
            test.test1 = req.body.test1;
            test.test2 = req.body.test2;
            test.test3 = req.body.test3;

            test.save().then(test => {
                res.json('Test updated');
            }).catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});

module.exports = router;