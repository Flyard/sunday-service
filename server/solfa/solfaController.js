const router = require('express').Router();
const pdfjslib = require('pdfjs-dist');
const axios = require('axios')
const {getPDFInfo} = require("./solfaService");
async function getPdf(req, res) {

    const query = {
        category: await req.query.category,
        number: await req.query.number,
        version: await req.query.version,
    }

    const pdfInfos = await getPDFInfo(query);

    return res.status(200).send(pdfInfos)
}

router.get('/', getPdf);


module.exports = router