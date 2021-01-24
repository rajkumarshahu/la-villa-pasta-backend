const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Pasta = require('./models/Pasta');
// const Sauce = require('./models/Sauce');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
});

// Read JSON files
const pastas = JSON.parse(
	fs.readFileSync(`${__dirname}/_data/pastas.json`, 'utf-8')
);

// const sauces = JSON.parse(
// 	fs.readFileSync(`${__dirname}/_data/sauces.json`, 'utf-8')
// );

// Import into DB
const importData = async () => {
	try {
		await Pasta.create(pastas);
		// await Sauce.create(records);
		console.log('Data Imported...'.green.inverse);
		process.exit();
	} catch (err) {
		console.error(err);
	}
};

// Delete data
const deleteData = async () => {
	try {
		await Pasta.deleteMany();
		//await Sauce.deleteMany();
		console.log('Data Destroyed...'.red.inverse);
		process.exit();
	} catch (err) {
		console.error(err);
	}
};

if (process.argv[2] === '-i') {
	importData();
} else if (process.argv[2] === '-d') {
	deleteData();
}
