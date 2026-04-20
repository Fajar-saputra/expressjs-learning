const express = require('express')
const router = express();

router.get('/haripertama',  (req, res) => {
    res.json({message: "ini hari pertama"})  
})

module.exports = router