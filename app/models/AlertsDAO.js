function AlertsDAO(connection) {
	this._connection = connection;
}

AlertsDAO.prototype.deleteAlerts = function (id, callback) {
	this._connection.query('delete from alerts where idAlert =' + id, callback);
	this._connection.end();
}

module.exports = function () {
	return AlertsDAO;
}