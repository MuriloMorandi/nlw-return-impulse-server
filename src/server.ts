import express from 'express'
import { routes } from './routes'

const App = express()

App.use(express.json())
App.use(routes)

App.listen(3333, () => {
    console.log("Server running!!!")
})


