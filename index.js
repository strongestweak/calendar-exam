const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/schedule", require("./server/routes"))

app.listen(process.env.PORT || '9000', () => {
    console.log(`Server is running on port: ${process.env.PORT || '9000'}`)
})