const Joi = require('joi');
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Initial -------------------------------------------------------------------------
mongoose
    .connect(
        'mongodb://mongo:27017/docker-node-mongo',
        { useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB Connected Successfully !'))
    .catch(err => console.log(err));

app.get('/', function (req, res) {
    res.json(
        {
            "REST API": "Security Scan Results API",
            "Endpoint": "http://localhost:8082/api"
        }
    );
});

app.listen(port, function () {
    console.log(`node.js server is running at ${port}`);
})

// mongodb api/scanresult --------------------------------------------------------
const ScanResult = require('./models/ScanResult');

app.get('/api/scanresults', (req, res) => {
    ScanResult.find()
        .then(items => res.json(items))
        .catch(err => res.status(404).json({ msg: 'No items found' }));
})

app.post('/api/scanresults', (req, res) => {
    const { error } = validateScanResult(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const scanResult = new ScanResult({
        status: req.body.status,
        repositoryName: req.body.repositoryName,
        findings: req.body.findings
    });

    scanResult.save();
    res.json(scanResult);
})

app.get('/api/scanresults/:id', (req, res) => {
    ScanResult.find(
        {
            _id: req.params.id
        }, function (err, results) {
            if (err) {
                res.status(404).json(`Find not found the id`);
            } else {
                res.json(results);
            }
        })
})

app.put('/api/scanresults/:id', (req, res) => {
    const { error } = validateScanResult(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    ScanResult.updateOne(
        {
            _id: req.params.id
        },
        {
            $set: {
                status: req.body.status,
                repositoryName: req.body.repositoryName
            }
        },
        function (err, results) {
            if (err) {
                return res.json(err);
            } else {
                ScanResult.find(
                    {
                        _id: req.params.id
                    }, function (err, results) {
                        if (err) {
                            return res.json(err);
                        } else {
                            return res.json(results);
                        }
                    })
            }
        });
})

app.delete('/api/scanresults/:id', (req, res) => {
    ScanResult.remove(
        {
            _id: req.params.id
        }, function (err, results) {
            if (err) {
                return res.json(err);
            } else {
                return res.json(results);
            }
        })
})

// Validate Function
function validateScanResult(scanResult) {
    const schema = {
        status: Joi.string().valid("Queued", "In Progress", "Success", "Failure").required(),
        repositoryName: Joi.string().required(),
        findings: Joi.array().required()
    };

    return Joi.validate(scanResult, schema);
}