import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import ViteExpress from 'vite-express'
import sponsorRoutes from './routes/sponsor.routes.js'

const app = express()
const PORT = process.env.PORT || 3000
const URI = process.env.MONGODB_URI

console.log('Connecting to MongoDB at:', URI)

app.use(cors())
app.use(express.json())
app.use('/api/sponsors', sponsorRoutes)

mongoose.connect(URI, {dbName: 'bornelejren'})
    .then(() => {
        console.log('MongoDB connected')
        ViteExpress.listen(app, PORT, () => console.log(`Server running on http://localhost:${PORT}`))
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB:', err)
        process.exit(1)
    })