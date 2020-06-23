function InteractionsDAO(connection) {
	this._connection = connection;
}

InteractionsDAO.prototype.getInteractions = function (id, callback) {
	this._connection.query('SELECT * FROM interactions where ticketInteraction = ' + id.id, callback);
	this._connection.end();

}


InteractionsDAO.prototype.insertInteraction = function (interaction, idTicket, req, callback) {

	var insert = {
		titleInteraction: interaction.titleInteraction,
		descriptionInteraction: interaction.descriptionInteraction,
		statusInteraction: interaction.statusInteraction,
		userInteraction: req.session.id_user,
		ticketInteraction: idTicket.id,
		dateInteraction: interaction.dateInteraction
	}
	this._connection.query('insert into interactions set ? ', insert);
	this._connection.query('SELECT * FROM tickets t JOIN users u on t.id_user = u.id_user JOIN  locations l on t.locationTicket = l.idLocation join machines m on t.id_machine = m.idMachine where t.idTicket = ' + idTicket.idTicket, callback);
	this._connection.end();

}

InteractionsDAO.prototype.updateInteraction = function (id, interaction, req, callback) {
	var DateNow = new Date();
	var update = {
		titleInteraction: interaction.titleInteraction,
		descriptionInteraction: interaction.descriptionInteraction,
		statusInteraction: interaction.statusInteraction,
		userInteraction: req.session.id_user,
		ticketInteraction: id.id,
		dateInteraction: DateNow
	}
	this._connection.query('UPDATE interactions set ? where idInteraction = ' + id.idInteraction, update);
	this._connection.query('SELECT * FROM tickets t JOIN users u on t.id_user = u.id_user JOIN  locations l on t.locationTicket = l.idLocation join machines m on t.id_machine = m.idMachine where t.idTicket = ' + id.id, callback);
	this._connection.end();


}

InteractionsDAO.prototype.deleteInteraction = function (id, callback) {
	this._connection.query('DELETE FROM interactions where idInteraction = ' + id.id, callback);
	this._connection.end();
}







module.exports = function () {
	return InteractionsDAO;
}