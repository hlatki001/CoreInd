function SolicitationsDAO(connection) {
    this._connection = connection;
}



SolicitationsDAO.prototype.apiSolicitations = function (req, res) {


    let data = {};
    this._connection.query('SELECT * FROM solicitations s left join tickets t on s.ticketSolicitation = t.idTicket left join users u on s.userSolicitation = u.id_user left join machines m on s.machineSolicitation = m.idMachine left join locations l on s.locationSolicitation = l.idLocation', function (err, results) {
        if (err) data = res.json({ data: false, message: err });
        else
            data = res.json({ data: results });
    });
    this._connection.end();
    return data;

}

SolicitationsDAO.prototype.insertSolicitations = function (values, callback) {



    this._connection.query('INSERT INTO solicitations set ?', values, callback);
    this._connection.end();



}

SolicitationsDAO.prototype.updateSolicitations = function (values, id, callback) {



    this._connection.query('update solicitations set ? where idSolicitation = ' + id, values, callback);
    this._connection.end();



}

SolicitationsDAO.prototype.deleteSolicitations = function (id, callback) {

    this._connection.query('delete from solicitations where idSolicitation = ' + id, callback);
    this._connection.end();

}

SolicitationsDAO.prototype.insertTicket = function (dadosForm, req, res) {

    this._connection.query('SELECT * FROM locations; SELECT * FROM machines; SELECT * FROM typeticket', [1, 2, 3], function (err, results) {
        if (err) throw err;
        res.render("admin/os_open", { siteName: "CoreInd - Indústria 4.0", user: req.session.name, role: req.session.role, imgPath: req.session.path, locations: results[0], machines: results[1], typetickets: results[2], validacao: {}, ticketss: dadosForm });
    });

    this._connection.end();
}

SolicitationsDAO.prototype.cancelSS = function (dadosForm, req, res) {

    this._connection.query('update solicitations set status = 1 where idSolicitation = ' + dadosForm.idSolicitation);    
    this._connection.end();
    res.redirect('/solicitations');
}


SolicitationsDAO.prototype.doubleSS = function (dadosForm, req, res) {

    this._connection.query('update solicitations set status = 2 where idSolicitation = ' + dadosForm.idSolicitation);    
    this._connection.end();
    res.redirect('/solicitations');

}





module.exports = function () {
    return SolicitationsDAO;
}