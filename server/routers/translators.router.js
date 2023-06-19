const Router = require("express")
const Translator = require("../models/Translator")
const User = require("../models/User")
const router = new Router()

router.get('/all',
    async (req, res) => {
    try {
        const translators = await Translator.find({}).populate('userId')
        
       return res.json({
           translators
       })
    } catch (e) {
        console.log(e)
        res.send({message: "server error"})
    }
})

router.get('/listbylanguage',
    async (req, res) => {
    try {
        const {language} = req.body
        const translators = await Translator.find({"language": language})
       return res.json({
           translators
       })
    } catch (e) {
        console.log(e)
        res.send({message: "server error"})
    }
})

router.post('/translatorinfobyid',
    async (req, res) => {
    try {
        console.log("trans by id", req)
        const {id} = req.body
        const translator = await Translator.findOne({"_id": id}).populate('userId')
       return res.json({
           translator
       })
    } catch (e) {
        console.log(e)
        res.send({message: "server error"})
    }
})

module.exports = router