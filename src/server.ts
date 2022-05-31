import express from 'express'
import cors from 'cors'
import { routes } from './routes'

const App = express()

App.use(cors());
App.use(express.json())
App.use(routes)

App.listen(3333, () => {
    console.log("Server running!!!")
})


