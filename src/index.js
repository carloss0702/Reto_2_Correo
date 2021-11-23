require('dotenv').config()

// configurar listening del puerto para ver el proyecto en un navegador
const express = require('express')
const port = 3000 || process.env.port

//Librerias de sendgrid para enviar correos electronicos
const email = require('./email')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.S.......)

// Librerias de twilio para mensajes de texto
const accountSID = process.env.T..........
const authToken = process.env.T...........

// para realizar pruebas con postman
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// Creacion de la ruta del proyecto 
// http://localhost:3000/
app.get('/',(req,res)=>{
    res.json({message:'success'})
})
// para poder ver la ruta en el navegador se activa el listen()
app.listen(port,()=>{
    console.log(`Accede al sitio web dando clic aqui: http://localhost:${port}`)
})

// ruta para enviar correos electronicos desde postman
app.post('/api/email/confirmacion',async(req,res,next)=>{
    //Llamamos funcion que estara en la clase email.js y que requiere de unos parametros que ingresen por Postman
    try{
        res.json(await email.sendOrder(req.body))
    }catch(err){
        next(err)
    }
})
//validar el codigo que nos devuelve la ejecucion del codigo, en caso de error mostrar todo el contenido de error
app.use((err, req, res, next)=>{
    //100 => informativo
    //200 => no es un error, es un status sucess
    //300 => no esta disponible el recurso
    //400 => No se encuentra URI
    //500 => Error del seervidor
    const statusCode = err.statusCode || 500
    console.error(err.message, err.stack)
    res.status(statusCode).json({'message': error.message})
    return
})

function getMessage(){
    const body = 'Mensaje enviado el 21/11/2021 20:35:00 p.m.'
    return{
        to:'csolanom@ucentral.edu.co',
        from:'csolanom@ucentral.edu.co',
        subject:'Prueba Reto Sendgrid Team Premium',
        text: body,
        html:`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;700&display=swap" rel="stylesheet">
        </head>
        <body>
            <div class="jumbotron">
                <div class="jumbotron-inner">
                    <div class="container">
                        <div class="container-textos">
                            <h1 class="title">Team Premium</h1>
                        </div>
                    <div class="container section">
                        <img src="https://images.pexels.com/photos/3937468/pexels-photo-3937468.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="">
                    </div>
                    <p align="justify">
                        Entra Ahora es el momento de optimizar tiempo 
                        en tus pedidos!
                    </p>
                </div>
                <div class="jumbotron-btn">
                    <a href="#" class="btn-one">RESERVAR AHORA!</a>
                </div>
            </div>
        </body>
        </html>`
    }
}

async function sendEmail(){
    try{
        await sgMail.send(getMessage())
        console.log('Correo ha sidop enviado')
    }catch(err){
        console.error('No se pudo enviar el mensaje')
        console.error(err)
        if(err.response) console.error(err.response.body)
    }
}

(async()=>{
    console.log('Enviando correo electronico')
    await sendEmail()
}) 



