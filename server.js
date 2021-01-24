const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const colors = require('colors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
// const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
// const swaggerOptions = require("./config/swaggerConfig");
// const swaggerSpec = swaggerJsDoc(swaggerOptions);

// Load env variables
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files
// const pastas = require('./routes/pastas');
// const orders = require('./routes/orders');
// const menu = require('./routes/menu');
// const sauces = require('./routes/sauces');
// const toppings = require('./routes/toppings');
// const auth = require('./routes/auth');

const app = express();

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept, Authorization'
		);
		res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
		return res.status(200).json({});
	}
	next();
});


// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// @desc    Logs request to console
const logger = (req, res, next) => {
	console.log(
		`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
	);
	next();
};

app.use(logger);

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
// app.use('/pastas', pastas);
// app.use('/orders', orders);
// app.use('/menu', menu);
// app.use('/sauces', sauces);
// app.use('/toppings', toppings);
// app.use('/auth', auth);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
	PORT,
	console.log(
		`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
			.bold
	)
);

module.exports = server
// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`.red);
	// Close server & exit process
	server.close(() => process.exit(1));
});
