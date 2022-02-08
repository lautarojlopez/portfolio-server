const express = require('express')
const app = express()
const nodemailer = require('nodemailer')
const cors = require('cors')
require('dotenv').config()

app.use(express.json())
app.use(cors())
app.post('/', (req, res) => {

	const transporter = nodemailer.createTransport({
		host: "smtp.googlemail.com",
		port: 587,
		secure: false,
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD
		}
	})

	const {nombre, email, asunto, mensaje} = req.body
	const options = {
		from: email,
		to: process.env.MI_EMAIL,
		subject: asunto,
		text: `De: ${nombre} - (${email})\n${mensaje}`
	}

	transporter.sendMail(options, (error, info) => {
		if(error){
			console.log(error);
			res.json({
				title: "Error al enviar el mensaje",
				msg: "Intentalo nuevamente"
			})
		}
		else{
			res.status(200).json({
				title: "Mensaje enviado",
				msg: "¡Gracias por ponerte en contacto conmigo!"
			})
		}
	})

})
const port = process.env.PORT
app.listen(port || '0.0.0.0')
