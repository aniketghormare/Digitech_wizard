const express=require("express")
const connection = require("./db")
const cors=require("cors")
require("dotenv").config()
const userRouter = require("./routes/user.route")
const agentMasterRouter = require("./routes/agentMaster.router")
const masterMasterRouter = require("./routes/masterMaster.router")

const miniAdminMasterRouter = require("./routes/miniAdminMaster.router")
const superAgentMasterRouter = require("./routes/superAgentMaster.router")
const miniAdminRouter = require("./routes/miniAdmin.router")

const app=express()
app.use(express.json())
app.use(cors())
let PORT=process.env.PORT || 5000


app.use("/api/user",userRouter)

app.use("/api/agentMaster",agentMasterRouter)
app.use("/api/masterMaster",masterMasterRouter)
app.use("/api/miniAdmin",miniAdminRouter)
app.use("/api/miniAdminMaster",miniAdminMasterRouter)
app.use("/api/superAgentMaster",superAgentMasterRouter)



app.listen(PORT,()=>{
    try {
        connection
        console.log(`Server is running at port ${PORT}`)
    } catch (error) {
        console.log(error)
    }
})