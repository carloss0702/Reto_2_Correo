const sgMail = require('@s......./mail')
sgMail.setApiKey(process.env.S.........)

function sendEmailConfirmationHTML(customerName, orderNro){
    return `<!DOCTYPE html>
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

function getMessage(emailParams){
    return{
        to:emailParams.toEmail,
        from:'csolanom@ucentral.edu.co',
        subject:'Confirmacion del Reto 02',
        text: `Hola, ${emailParams.customerName}, te enviamos las imagenes de los productos comprados
        y la factura con numero ${emailParams.orderNro}. Gracias por tu compra`,
        html:sendEmailConfirmationHTML(emailParams.customerName, emailParams.orderNro)
    }
}

async function sendOrder(emailParams){
    try{
        await sgMail.send(getMessage(emailParams))
        return {Message: 'Confirmacion de compra enviada'}
    }catch(err){
        const message = 'No se pudo enviar la orden de compra. Valide los errores'
        console.error(message)
        console.error(err)
        if(err.response) console.error(err.response.body)
        return(message)
    }
}
module.exports={
    sendOrder
}
