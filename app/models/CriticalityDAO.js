function CriticalityDAO(connection) {
    this._connection = connection;
}

CriticalityDAO.prototype.getCriticality = function (req, res) {
    
        let data = {};
        this._connection.query('SELECT * from criticality', function (err, results) {
            if (err) data = res.json({ data: false, message: err });
            else
                data = res.json({ data: results });
        });
        this._connection.end();
        return data;
}

CriticalityDAO.prototype.insertCriticality = function (values, callback) {    

        var moment = require('moment');
        var now = moment().format("DD/MM/YYYY HH:mm:ss");
        values.dateCriticality = now;
        this._connection.query('INSERT INTO criticality set ?', values, callback);
        this._connection.end();
}

CriticalityDAO.prototype.updateCriticality = function (values, id, callback) { 
        this._connection.query('UPDATE criticality set ? where idCriticality = ' + id, values, callback);
        this._connection.end();
}


CriticalityDAO.prototype.deleteCriticality = function (id, callback) {    
        this._connection.query('delete from criticality where idCriticality = ' + id, callback);
        this._connection.end();
}

module.exports = function () {
    return CriticalityDAO;
}