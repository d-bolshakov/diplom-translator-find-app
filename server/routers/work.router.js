const Router = require("express")
const User = require("../models/User")
const Translator = require("../models/Translator")
const Work = require("../models/Work")
const router = new Router()

router.post('/offer',
    async (req, res) => {
    try {
        console.log(req)
        const {customer, translator, data} = req.body
        const status = 'offered'
        const dateCreated = Date.now()
        const work = new Work({customer, translator, status, dateCreated, data})
        const workId = work._id
        work.save()
        const user = await User.findOne({"_id": customer})
        user.works.push(workId)
        user.save()
        const transl = await Translator.findOne({"_id": translator})
        transl.works.push(workId)
        transl.save()
        
        return res.json({message: 'Work offered'})
    } catch (e) {
        console.log(e)
        res.send({message: "server error"})
    }
})

router.post('/confirm',
    async (req, res) => {
    try {
        const {id} = req.body
        const work = await Work.findOne({"_id": id})
        work.status = 'confirmed'
        work.save()
       return res.json({
           message: "Offer was confirmed"
       })
    } catch (e) {
        console.log(e)
        res.send({message: "server error"})
    }
})

router.post('/done',
    async (req, res) => {
    try {
        console.log("req ", req)
        const {id, doneurl} = req.body
        const work = await Work.findOne({"_id": id})
        work.status = 'done'
        work.response.url = doneurl
        work.response.dateResponded = Date.now()
        work.save()
       return res.json({
            message: "Work link was sent"
       })
    } catch (e) {
        console.log(e)
        res.send({message: "server error"})
    }
})

router.post('/apply',
    async (req, res) => {
    try {
        console.log("req ", req)
        const {id} = req.body
        const work = await Work.findOne({"_id": id})
        work.status = 'applied'
        work.save()
       return res.json({
            message: "Work was applied"
       })
    } catch (e) {
        console.log(e)
        res.send({message: "server error"})
    }
})

router.post('/ofuser', 
    async (req, res) => {
    try {
        console.log(req)
       const {id} = req.body
       const user = await User.findOne({"_id": id}).populate({path: 'works', populate: { path: 'translator', populate: { path: 'userId'} }})
       return res.json({
          user: user.works
       })
    } catch (e) {
        console.log(e)
        res.send({message: "server error"})
    }
})

router.post('/oftranslator', 
    async (req, res) => {
    try {
        console.log(req)
       const {id} = req.body
       const translator = await Translator.findOne({"userId": id}).populate({path: 'works', populate: { path: 'customer'}})
       return res.json({
          translator: translator.works
       })
    } catch (e) {
        console.log(e)
        res.send({message: "server error"})
    }
})


module.exports = router