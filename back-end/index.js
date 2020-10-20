const express = require('express')
const app = express()
const cors = require('cors')
const port = 4000
const dbPool = require('./dbConfig');

app.use(express.json())
app.use(cors())

app.listen(port, () => {
    console.log(`The server is listening on ${port}`);
})

const invoices = require("./routes/invoices");
app.use('/invoices', invoices);

 module.exports =app;
