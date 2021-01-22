const mongoose = require('mongoose');
require('dotenv').config();
const databaseHost = process.env.DATABASE_HOST || 'localhost';
const databasePort = process.env.DATABASE_PORT || '27017';
const databaseName = process.env.DATABASE_NAME || 'app';
const databaseUser = process.env.DATABASE_USER;
const databasePassword = process.env.DATABASE_PASSWORD;
const databaseURL = process.env.DATABASE_URL || "mongodb+srv://Admin:admin@tuna.tajms.mongodb.net/Tuna?retryWrites=true&w=majority";


if (databaseURL) {
	mongoose.connect(databaseURL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
} else {
	if (databaseUser && databasePassword) {
		mongoose.connect(`mongodb://${databaseUser}:${databasePassword}@${databaseHost}:${databasePort}/${databaseName}?authSource=admin`, { useNewUrlParser: true, useUnifiedTopology: true });
	} else {
		mongoose.connect(`mongodb://${databaseHost}:${databasePort}/${databaseName}?authSource=admin`, { useNewUrlParser: true, useUnifiedTopology: true });
	}
}


const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.on('open', ()=> console.log('connected to database'));