const dotenv = require("dotenv");
dotenv.config();
const MongoClient = require("mongodb").MongoClient;

let _db;

const initDB = (callback) => {
	if (_db) {
		console.log("Db already init");
		return callback(null, _db);
	}
	MongoClient.connect(process.env.MONGODB_URI)
		.then((client) => {
			_db = clientcallback(null, _db);
		})
		.catch((err) => {
			callback(err);
		});
};
const getDB = () => {
	if (!_db) {
		throw Error("DB not init");
	}
	return _db;
};

module.exports = {
	initDB,
	getDB,
};
