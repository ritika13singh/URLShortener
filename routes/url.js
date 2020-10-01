const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const validurl = require('valid-url');
const config = require('config');

const Url = require('../models/Url');

//@route   POST /api/url/shorten
//@desc    creates short url
let longUrl;
router.post('/shorten', async (req, res) => {

    const { fullurl } = req.body;
    longUrl= fullurl;
    //console.log(longUrl);
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
            if (!url) {
                const shortUrl = baseUrl + '/' + urlCode;
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });
                await url.save();

                
            }
            res.redirect('/');


        } catch (err) {
            console.error(500).json('Server Error');
        }

    } else {
        //console.log(longUrl);
        res.status(401).json('Invalid long url');
    }

});

router.get('/',async (req,res) =>{
    let short = await Url.findOne({longUrl});
    console.log(short);
    res.render('index.ejs',{short:short.shortUrl});
});





module.exports = router;
