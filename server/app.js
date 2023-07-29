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
if(process.env.NODE_ENV == 'prod'){
  app.set('trust proxy', 1)
  app.get('/ip', (request, response) => response.send(request.ip))
}
// cors options
const whiteList = [`${process.env.PRODUCTION_URL}`,`${process.env.LOCALHOST_URL}`,'http://localhost:5001/']
var corsOptions = {
    origin: function (origin, callback) {
      if (whiteList .indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
app.use(cors())
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
  app.use("/auth",cors(corsOptions),authRoutes)


  
  if(process.env.NODE_ENV !== 'prod'){
    console.log(process.env.POSTGRES_URI)
  }else{
    console.log("Postgres Hosted on cockaroach")
  }