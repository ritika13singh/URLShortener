const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const validurl = require('valid-url');
const config = require('config');

const Url = require('../models/Url');

//@route   POST /api/url/shorten
//@desc    creates short url
router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    const baseUrl = config.get('baseURL');

    //Check base url
    if (!validurl.isUri(baseUrl)) {
        res.status(401).json('Invalid base URL');
    }
    //Short url code
    const urlCode = shortid.generate();

    //Check long url
    if (validurl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });
            if (url) {
                res.json(url);
            } else {
                const shortUrl = baseUrl + '/' + urlCode;
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });
                await url.save();

                res.json(url);
            }


        } catch (err) {
            console.error(500).json('Server Error');
        }

    } else {
        res.status(401).json('Invalid long url');
    }

});





module.exports = router;
