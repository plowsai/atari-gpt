
const express = require('express')
// const bodyParser = require('body-parser')
// const session = require('express-session')
// const path = require('path')

// const dev = process.env.NODE_ENV !== 'production'
// const next = require('next')
// const pathMatch = require('path-match')
// const app = next({ dev })
// const handle = app.getRequestHandler()
// const route = pathMatch()
// const {parse} = require('url')

const app = express()
// const apiRoutes = require ('./routes/api')
const port = 3000


app.set("view engine", "ejs")

app.get('/', (req, res)=> {
    res.render("index.ejs", {
    })
})

app.get("/changelog", (req, res) => {
    res.render("changelog.ejs")
 })
// app.get("/desktop-ai", (req, res) => {
//     res.render("desktop-ai.ejs")
//  })
// app.get("/browser-ai", (req, res) => {
//     res.render("browser-ai.ejs")
//  })
app.get("/early-access", (req, res) => {
    res.render("early-access.ejs")
 })
app.get("/terms-of-service", (req, res) => {
    res.render("terms.ejs")
 })

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
