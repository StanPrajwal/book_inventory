const Books = require("../modal/Book")
const routes = require("express").Router()
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
routes.post("/register", async (req, res) => {

    try {
        console.log(req.body)
        const { name, email, password } = req.body.values
        const hash = await bcrypt.hash(password, 10)

        const user = await Books.create({
            author_name: name, email, password: hash
        })
        console.log(user)
        res.json({
            sucess: "Registered successfully"
        })
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                error: "User already exist"
            })
        }
        throw Error(error.message)
    }
})

routes.post("/login", async (req, res) => {

    try {
        console.log(req.body)
        const { user_name, password } = req.body.values
        const user = await Books.findOne({ email:user_name })
        const verifyPassword = await bcrypt.compare(password,user.password)
        if(verifyPassword){
            console.log(user)
            const token = await jwt.sign({id:user._id},"book_app",{ expiresIn: "1h" })
            if(token){
                res.json({
                    sucess: "Login successfully",
                    token,
                    user
                })
            }
           
        }
        return res.status(400).json({
            error:"Invalid credetial"
        })
       
    } catch (error) {
        console.log(error.message)
        throw Error(error.message)
    }
})

module.exports = routes
