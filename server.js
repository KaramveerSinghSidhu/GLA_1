//adding required libraries

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const uri = process.env.CONNECTION_TO_DATABASE
const mongoose = require('mongoose')
const app = express()
const Student = require('./modules/student')

//connecting to mongoDB 
try{
    mongoose.connect(uri, {
        useNewUrlParser: true, useUnifiedTopology: true
    }).then(()=>{
        console.log('Connected')
    }).catch(e=>{
        console.log(e)
    })
}catch (e){b
    handleError(e)
}

//defining the front end paths / view engine
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(express.urlencoded({extended:false}))


//paths / routes

app.get('/', async (req, res) => {
    students = await Student.find({})
    var hasStudnets = false

    if(students != null){
        hasStudnets = true
    }

    res.render('index.ejs', {hasStudnets: hasStudnets, students: students})
})

app.get('/add/students', async (req, res) => {
    students = await Student.find({})
    var id = 1

    if(students != null){
        students.forEach(student => {
            id++
        })
    }
    res.render('add.ejs', {idValue: id})
})

app.post('/students', async (req, res) => {
    console.log('working')
    var studnet = new Student({
        id: req.body.id,
        name: req.body.name,
        number: req.body.number,
        age: req.body.age
    })
    try{
        student = await studnet.save()
        res.redirect('/')
    }catch{
        res.redirect('/add/students')
    }
})

app.listen(process.env.PORT || 1000)