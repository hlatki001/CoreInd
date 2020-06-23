function LocationsDAO(connection) {
	this._connection = connection;
}

LocationsDAO.prototype.getLocations = function (callback) {
		this._connection.query('SELECT l.*, descriptionLocation, DATE_FORMAT( dateLocation, "%d/%m/%Y %H:%i" ) AS dateLocation FROM locations l;', callback);
		this._connection.end();
	}


LocationsDAO.prototype.insertLocations = function (location, req, callback) {

		this._connection.query('insert into locations set ? ', location, callback);
		this._connection.end();
}


LocationsDAO.prototype.getLocation = function (id, callback) {

		this._connection.query('SELECT l.*, descriptionLocation, DATE_FORMAT( dateLocation, "%d/%m/%Y %H:%i" ) AS dateLocation FROM locations l where idLocation = ' + id.id, callback);
		this._connection.end();
}

LocationsDAO.prototype.updateLocation = function (id, location, req, callback) {

		this._connection.query('UPDATE locations set ? where idLocation = ' + id.id, location);
		this._connection.query('SELECT l.*, descriptionLocation, DATE_FORMAT( dateLocation, "%d/%m/%Y %H:%i" ) AS dateLocation FROM locations l where idLocation = ' + id.id, callback);
		this._connection.end();	

}

LocationsDAO.prototype.deleteLocation = function (id, callback) {

		this._connection.query('DELETE FROM locations where idLocation = ' + id.id, callback);
		this._connection.end();
}

module.exports = function () {
	return LocationsDAO;
}