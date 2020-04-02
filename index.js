const express = require('express')

const app = express()
app.use(express.json())

app.use("/api/schedule", require("./server/routes"))

app.listen(process.env.PORT || '5000', () => {
    console.log(`Server is running on port: ${process.env.PORT || '5000'}`)
})