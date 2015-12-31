var app = require('./app_config.js');

var mysql = require('mysql');

var con = mysql.createConnection({
	host : "localhost",
	user : "root",
	password: "",
	database: "mysqlonnode"
});

con.connect(function(err){
	if(err){
		console.log("Error connection to DB");
		return;
	}

	console.log('connection established')
});


app.get("/", function(req,res){
	res.end("Server ON");
});

app.get("/estado/:cep", function(req, res){
	var cep = req.param('cep').toString().substring(0,5);
	var query = "SELECT UF FROM uf WHERE '" + cep + "' BETWEEN Cep1 AND Cep2";
	con.query(query, function(err, row){
		if(err) throw err;

		res.json(row[0]['UF']);


		console.log(row[0]['UF']);
	});
});

app.get("/cep/:cep", function(req, res){
	var cep = req.param('cep').toString();
	var cepEdit = cep.substring(0, 5) + "-" + cep.substring(5, 8);

	var cepEstado = cep.substring(0,5);
	var queryEstado  = "SELECT UF FROM uf WHERE '" + cepEstado + "' BETWEEN Cep1 AND Cep2";
	con.query(queryEstado, function(err, row){
		if(err) throw err;
		var query = 'SELECT * FROM '+row[0]['UF'].toLowerCase() + ' where cep = \''+cepEdit + '\'';

		con.query(query, function(err, rows){
			if(err) throw err;
			res.json(rows);
			console.log(rows);
		});
	});
});

// con.end(function(err){

// });

