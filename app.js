var app = require('./app_config.js');

var con = require('./db_config.js');


app.get("/", function(req,res){
	res.end("Server ON");
});

app.get("/cep/:estado/:cep", function(req, res){
	var estado = req.param('estado');
	var cep = req.param('cep').toString();
	var cepEdit = cep.substring(0, 5) + "-" + cep.substring(5, 8);
	var query = 'SELECT * FROM '+estado+ ' where cep = \''+cepEdit + '\'';
	console.log(query);
	con.query(query, function(err, rows){
		if(err) throw err;

		res.json(rows);

		console.log(rows);
	});
});

// con.end(function(err){

// });

