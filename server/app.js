import express from "express"
import morgan from "morgan"
import cors from 'cors'
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import helmet from 'helmet'
import { env } from "custom-env";
env(true);

const app = express()

// Middleware
dotenv.config()
app.use(morgan("dev"))
app.use(helmet())
// cors options
const whiteList = [`${process.env.PRODUCTION_URL}`,`${process.env.LOCALHOST_URL}`]
var corsOptions = {
    origin: function (origin, callback) {
      if (whiteList .indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
app.use(cors(corsOptions))
app.use(express.json({limit:"30mb", extended:true}))
app.use(express.urlencoded({limit:"30mb", extended:true}))



const port = process.env.PORT || 5001

  app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
  })

  //app.set("db",dataDB)
  app.get("/",cors(),(req,res)=>{
    console.log("Hello, this is the backend server")
    res.send("Hello, this is the backend server")
  })
  app.use("/auth",authRoutes)

  console.log(process.env.NODE_ENV)
  console.log(process.env.POSTGRES_URI)