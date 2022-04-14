//adding required libraries

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const { redirect } = require('express/lib/response')
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

    //this is not the most effiecent way but it gets the job done because i want it to look cool
    if(students != null){
        students.forEach(student => {
            hasStudnets = true
        })
    }
    res.render('index.ejs', {hasStudnets: hasStudnets, students: students})
})

//added a user to DB
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

//deletes user from db
app.get('/delete/students', async (req, res) => {
    students = await Student.find({})

    res.render('remove.ejs', {students: students})
})

app.post('/remove/students', async (req, res) =>{
    var a = req.body
    var id = parseInt(a.id)
    await Student.findOneAndDelete({id: id})

    res.redirect("/")
})

//updates user on db
app.get('/student/:id', async (req, res) => {
    student = await Student.findById({_id: req.params.id})

    res.render('edit.ejs', {student: student})
})

app.post('/update/student/:id', async (req, res) => {
    var studnet = new Student({
        id: req.body.id,
        name: req.body.name,
        number: req.body.number,
        age: req.body.age
    })
    try{
        student = await studnet.save()
        await Student.findByIdAndDelete({_id: req.params.id})
        res.redirect('/')
    }catch{
        res.redirect('/add/students')
    }
})


app.listen(process.env.PORT || 2000)