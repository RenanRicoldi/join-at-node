const { response } = require('express')
const express = require('express')

const app = express()

app.use(express.json())

app.get('/', (request, response) => {
    response.json({ status: '✅ Listening at http://localhost:8000' })
})

app.listen(8000, () => {
    console.log('✅ Listening at http://localhost:8000')
})