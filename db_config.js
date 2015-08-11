var mysql = require('mysql');

var con = module.exports = mysql();

con = mysql.createConnection({
	host : "localhost",
	user : "root",
	password: "",
	database: "cep"
});

con.connect(function(err){
	if(err){
		console.log("Error connection to DB");
		return;
	}
	console.log('connection established')
});

// con.end(function(err){

// });