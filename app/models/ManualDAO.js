function ManualDAO(connection) {
	this._connection = connection;
}


ManualDAO.prototype.getManualDetails = function (id, req, res) {

	this._connection.query('SELECT * from manuals m left join uploads u on m.idManual = u.idMachine left join machines ma on m.id_machineManual = ma.idMachine where idManual = ' + id.id, function (err, results) {
		if (err) throw err;
		res.render("admin/manual-details", { user: req.session.name, role: req.session.role, userID: req.session.id_user, siteName: "CoreInd - Indústria 4.0", manual: results, validacao: {} });
	});
	this._connection.end();
}



ManualDAO.prototype.insertFiles = function (id, files, req, res) {

	files.forEach(element => {
		this._connection.query('INSERT INTO manuals (titleManual, pathManual, id_machineManual, date_addManual) VALUES ("' + element.originalname + '", "' + element.filename + '", ' + id + ', NOW())', function (err, results) {
			if (err) throw err;
			res.redirect("manuals");
			return;
		});
	});
	this._connection.end();
}


ManualDAO.prototype.deleteFiles = function (id, path, req, res) {

	var fs = require('fs');

	var caminho = "D:/Projetos/CoreInd/app/public/uploads/" + path;

	fs.unlink(caminho, function (error) {
		if (error) {
			throw error;
		}
	});

	this._connection.query('DELETE FROM manuals where idManual =' + id, function (err, results) {
		if (err) throw err;
		res.redirect("manuals");
		return;
	});
	this._connection.end();
}




module.exports = function () {
	return ManualDAO;
}