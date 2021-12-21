const express = require('express')
const https = require('https')
const path = require('path')
const fs = require('fs')
const app = express()

//Static files
app.use(express.static('public'))
app.use("/css", express.static(__dirname + 'public/css'))
app.use("/icons", express.static(__dirname + 'public/icons'))

//Views
app.set("views", "./views")
app.set("view engine", "ejs")

app.get("", (req, res) => {
  res.render("index")
})

// app.listen(3443, ()=> console.log("Server is running on 3443"))

const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
  },
  app
)

sslServer.listen(3443, () => console.log('Secure server 🚀🔑 on port 3443'))
