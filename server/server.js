require('dotenv').config()
const express = require('express');
const app = express()
const solfaController = require('./solfa/solfaController');

const cors = require('cors');

app.use(cors());
app.use('/solfas', solfaController);
async function main() {
    await app.listen(3000, () => {
        console.log(`API Listening on port 3000`);
    })
}

main()