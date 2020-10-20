const express = require('express')
const app = express()
const mysql = require('mysql');
const dbPool = require('../dbConfig');
const fs = require('fs');
const multer = require('multer');
const readXlsxFile = require('read-excel-file/node');
const { createProxyMiddleware } =require('http-proxy-middleware');

const cors = require('cors')
app.use(express.json())
app.use(cors())

global.__basedir = __dirname;

app.get("/list", (req, res) => {
    dbPool.query("select * from invoices", (error, results, fields) => {
        if (error) {
            throw error;
        }
        else {
            res.send({ data: results });
        }
    });
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + '/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
});

const upload = multer({ storage: storage });

app.post('/create', upload.single("uploadfile"), createProxyMiddleware({

    target: 'http://localhost:4000/', //original url
    changeOrigin: true,
    onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}),

    (req, res) => {
        importExcelData2MySQL(__basedir + '/uploads/' + req.file.filename);
        res.json({
            'msg': 'File uploaded/import successfully!', 'file': req.file
        });
    });

function importExcelData2MySQL(filePath) {

    readXlsxFile(filePath).then((rows) => {
        console.log(rows);

        rows.shift();

        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'tradecred'
        });

        connection.connect((error) => {
            if (error) {
                console.error(error);
            } else {
                let query = 'insert into invoices (inv_number, amount, inv_date, billed_to, billed_by, type_of) values ?';
                connection.query(query, [rows], (error, response) => {
                    console.log(error || response);
                });
            }
        });
    })
}

module.exports = app;