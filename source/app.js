const path = require("path")
const express = require("express")
const hbs = require ("hbs")
const request = require('postman-request')
const forecast = require("./utils/forecast")
const geocode = require("./utils/geocode")

const app = express() 

//path for express configuration
const publicDirectory = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templates/views")
const partialPath = path.join(__dirname,'../templates/partials')

//set up handlebars engine and views location 
app.set('view engine', 'hbs')
app.set("views",  viewsPath)
hbs.registerPartials(partialPath)

//set up static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
     res.render('index', {
        title:"weather app",
        name:"Patrick Lagoa"
     })
 })


 app.get("/about", (req, res) => {
    res.render("about", {
        title:"About the app",
        name:"Patrick Lagoa"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
    message:"Message d'aide pour les utilisateurs",
    title:"Aide pour les utilisateurs",
    name:"Patrick Lagoa"
    })
})



app.get("/weather", (req, res) => {
   
    if(!req.query.address) {
        return res.send({
            error: "veuillez rentrer une localité"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
         }
         

    forecast(latitude, longitude, (error, forecastdata) => {
        
        if (error) {
            return res.send ({error})
        }
        
        res.send({
            forecast: forecastdata,
            location: location,
            address: req.query.address
        })
     
         
     })
    })
       
})

app.get("/products", (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: "veuillez entrer une recherche"
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    }) 
})

app.get("/help/*", (req, res) => {
    res.render("error404", {
        errorMessage: "Désole cette rubrique d'aide est introuvable" ,
        name:"Patrick Lagoa"
    })
})

app.get("*", (req, res) => {
    res.render("error404", {
        errorMessage: "Désolé cette page est introuvable",
        name:"Patrick Lagoa"
    })
})


app.listen(3000, () => {
    console.log("le serveur est sur le port 3000")
})