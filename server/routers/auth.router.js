const Router = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {check, validationResult} = require("express-validator")
const User = require("../models/User")
const Translator = require("../models/Translator")
const config = require("config")
const authMiddleware = require('../middleware/auth.middleware')
const router = new Router()

router.post('/registration', 
    [
        check('email', "Uncorrect email").isEmail(),
        check('password', "Password must be longer than 3").isLength(3,10)
    ],
    async (req, res) => {
        console.log(req)
    try {
        console.log(req)
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: "Uncorrect request", errors})
        }
        const {email, password, name, role, language} = req.body

        const candidate = await User.findOne({email})
        if (candidate) {
            return res.status(400).json({message: `User with email ${email} already exists`})
        }
        const hashPassword = await bcrypt.hash(password, 6)
        const user = new User({email, password: hashPassword, name, role})
        const userId = user._id
        await user.save()
        if (role === 'translator') {
            const translator = new Translator({userId, language})
            await translator.save()
        }
        return res.json({message: "User was created"})
    } catch (e) {
        console.log(e)
        res.send({message: "server error"})
    }
})

router.post('/login', 
    async (req, res) => {
    try {
        console.log(req)
       const {email, password} = req.body
       const user = await User.findOne({email})
       if (!user) {
           return res.status(404).json({message: "User not found"})
       }
       const isPassValid = bcrypt.compareSync(password, user.password)
       if (!isPassValid) {
            return res.status(400).json({message: "Invalid password"})
       }
       const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
       return res.json({
           token,
           user: {
            id: user.id,
            email: user.email,
            name: {
                firstName: user.name.firstName,
                lastName: user.name.lastName
            },
            role: user.role,
            works: user.works
           }
       })
    } catch (e) {
        console.log(e)
        res.send({message: "server error"})
    }
})

router.get('/auth', authMiddleware,
    async (req, res) => {
    try {
        const user = await User.findOne({_id: req.user.id})
        const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
       return res.json({
           token,
           user: {
            id: user.id,
            email: user.email,
            role: user.role
           }
       })
    } catch (e) {
        console.log(e)
        res.send({message: "server error"})
    }
})



module.exports = router