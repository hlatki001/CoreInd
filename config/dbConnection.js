var mysql = require('mysql');

var connMySQL = function(){
	return mysql.createConnection({
		host : 'mysql.dotsolucoes.com.br',
		user : 'dotsolucoes01',
		password : 'agz9479hlA',
		database : 'dotsolucoes01',
		multipleStatements: true
	});
}

module.exports = function () {
	return connMySQL;
}