function MachinesDAO(connection) {
	this._connection = connection;
}


MachinesDAO.prototype.getMachineDetails = function (id, req, res) {


	this._connection.query('SELECT * FROM machines left join locations on machines.locationMachine = locations.idLocation where idMachine = ' + id.id, function (err, results) {
		if (err) throw err;
		res.render("admin/machine-details", { user: req.session.name, role: req.session.role, imgPath: req.session.path, userID: req.session.id_user, siteName: "CoreInd - Indústria 4.0", machine: results, validacao: {} });
	});
	this._connection.end();
}

MachinesDAO.prototype.editMachineDetails = function (id, req, res) {


	this._connection.query('SELECT * FROM machines left join locations on machines.locationMachine = locations.idLocation where idMachine = ' + id.id, function (err, results) {
		if (err) throw err;
		res.render("admin/machine-edit", { user: req.session.name, role: req.session.role, imgPath: req.session.path, userID: req.session.id_user, siteName: "CoreInd - Indústria 4.0", machine: results, validacao: {} });
	});
	this._connection.end();
}


MachinesDAO.prototype.insertMachine = function (machine, res, callback) {

	this._connection.query('insert into machines set ? ', machine);
	this._connection.end();
	res.redirect("machines");
}

MachinesDAO.prototype.updateMachine = function (machine, id, callback) {
	this._connection.query('UPDATE machines set ? where idMachine =' + id.id, machine, callback);
	this._connection.end();
}


MachinesDAO.prototype.deleteMachine = function (id, res, callback) {
	this._connection.query('delete from machines where idMachine = ' + id);
	this._connection.end();
	res.redirect("machines");


}

MachinesDAO.prototype.deleteTypeMachine = function (id, res, callback) {
	this._connection.query('delete from typemachine where idTypeMachine = ' + id);
	this._connection.end();
	res.redirect("typemachines");


}

MachinesDAO.prototype.insertTypeMachine = function (item, res, callback) {

	this._connection.query('insert into typemachine set ? ', item);
	this._connection.end();
	res.redirect("typemachines");


}

MachinesDAO.prototype.updateTypeMachine = function (id, item, res, callback) {
	this._connection.query('update typemachine set ? where idTypeMachine = ' + id, item);
	this._connection.end();
	res.redirect("typemachines");
}

module.exports = function () {
	return MachinesDAO;
}