/**
 * app.js controll most of the logic from the REST API. 
 * This is a very simple file template
 * 
 * 
 */

import express from "express";
import cors from 'cors'


const app = express()

/* ======= MIDDLEWARES ======= */

app.use(express.json())
app.use(cors())

/* ======= ROUTES ======= */

// app.use([routeName]) // usually, you import it from ./routes/[routeName.routes.js]

app.use((req, res, next) => {
  res.status(404).json({
    message: 'endpoint not found'
  })
})

export default app