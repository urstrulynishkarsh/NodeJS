const express = require("express")
const router = express.Router()


const {create,find,findById,updated,deleteById}=require('../controllers/Task')
const {auth}=require("../middleware/auth")


// Task routes
router.post("/tasks",auth,create)
router.get("/tasks/find",auth,find)
router.get("/tasks/:id",auth,findById)
// router.get('/read',read)
// router.get('/read/:id',readById)
router.put('/tasks/:id',auth,updated)
router.delete('/tasks/:id',auth,deleteById)








module.exports=router;