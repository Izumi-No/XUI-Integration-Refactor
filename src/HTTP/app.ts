import express from "express"
import {router} from "./Routes"
import bodyParser from "body-parser"


const app = express()

app.use(bodyParser.json())

app.use(router)

export {app}