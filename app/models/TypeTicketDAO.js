function TypeTicketDAO(connection) {
    this._connection = connection;
}


TypeTicketDAO.prototype.getTypes = function (callback) {

    this._connection.query('SELECT * FROM typeticket', callback);
    this._connection.end();

}

TypeTicketDAO.prototype.insertTypes = function (types, callback) {

    this._connection.query('insert into typeticket set ? ', types, callback);
    this._connection.end();

}

TypeTicketDAO.prototype.deleteTypes = function (id, callback) {

    this._connection.query('delete from typeticket where idTypeTicket =' + id.id, callback);
    this._connection.end();

}

TypeTicketDAO.prototype.updateTypes = function (id, types, callback) {

    this._connection.query('update typeticket set ? where idTypeTicket = ' + id, types);
    this._connection.query('SELECT * FROM typeticket', callback);
    this._connection.end();
}




module.exports = function () {
    return TypeTicketDAO;
}