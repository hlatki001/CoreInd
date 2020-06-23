function ApiDAO(connection) {
    this._connection = connection;
}

ApiDAO.prototype.apiTickets = function (req, res, id) {


    let data = {};
    var idUser = req.session.id_user;
    if (req.session.role == 0 || req.session.role == 1) {
        if ([req.params.id] == 0) {
            this._connection.query('SELECT COUNT(idTicket) countOS FROM tickets where statusTicket = "Em Andamento"; SELECT COUNT(idTicket) countOS FROM tickets where statusTicket = "Resolvido"; SELECT COUNT(idTicket) countOS FROM tickets', [1, 2, 3], function (err, results) {
                if (err) data = res.json({ data: false, message: err });
                else
                    data = res.json({ aberto: results[0], resolvido: results[1], total: results[2] });
            });
            this._connection.end();
            return data;
        }
        else {
            this._connection.query('SELECT COUNT(idTicket) countOS FROM tickets where statusTicket = "Em Andamento" and id_user = ' + [req.params.id] + '; SELECT COUNT(idTicket) countOS FROM tickets where statusTicket = "Resolvido" and id_user = ' + [req.params.id] + '; SELECT COUNT(idTicket) countOS FROM tickets where id_user = ' + [req.params.id] + '', [1, 2, 3], function (err, results) {
                if (err) data = res.json({ data: false, message: err });
                else
                    data = res.json({ aberto: results[0], resolvido: results[1], total: results[2] });
            });
            this._connection.end();
            return data;
        }
    }
    else {

        this._connection.query('SELECT COUNT(idTicket) countOS FROM tickets where statusTicket = "Em Andamento" and id_user = ' + idUser + '; SELECT COUNT(idTicket) countOS FROM tickets where statusTicket = "Resolvido" and id_user = ' + idUser + '; SELECT COUNT(idTicket) countOS FROM tickets where id_user = ' + idUser + '', [1, 2, 3], function (err, results) {
            if (err) data = res.json({ data: false, message: err });
            else
                data = res.json({ aberto: results[0], resolvido: results[1], total: results[2] });
        });
        this._connection.end();
        return data;
    }

}


ApiDAO.prototype.apitickets_graph = function (req, res) {

    let data = {};
    var idUser = req.session.id_user;

    if (req.session.role == 0 || req.session.role == 1) {
        if ([req.params.id] == 0) {
            this._connection.query('SELECT typeticket.titleTypeTicket, typeticket.colorTypeTycket, tickets.id_user, COUNT(*) AS Total FROM tickets LEFT JOIN typeticket ON typeticket.idTypeTicket = tickets.typeTicket GROUP BY tickets.typeTicket', function (err, results) {
                if (err) data = res.json({ data: false, message: err });
                else
                    data = res.json({ data: results });
            });
            this._connection.end();
            return data;
        }
        else {
            this._connection.query('SELECT typeticket.titleTypeTicket, typeticket.colorTypeTycket, tickets.id_user, COUNT(*) AS Total FROM tickets LEFT JOIN typeticket ON typeticket.idTypeTicket = tickets.typeTicket where id_user = ' + [req.params.id] + ' GROUP BY tickets.typeTicket', function (err, results) {
                if (err) data = res.json({ data: false, message: err });
                else
                    data = res.json({ data: results });
            });
            this._connection.end();
            return data;
        }
    }
    else {
        this._connection.query('SELECT typeticket.titleTypeTicket, typeticket.colorTypeTycket, tickets.id_user, COUNT(*) AS Total FROM tickets LEFT JOIN typeticket ON typeticket.idTypeTicket = tickets.typeTicket where id_user = ' + idUser + ' GROUP BY tickets.typeTicket', function (err, results) {
            if (err) data = res.json({ data: false, message: err });
            else
                data = res.json({ data: results });
        });
        this._connection.end();
        return data;
    }


}

ApiDAO.prototype.apitickets_graph_mes = function (req, res) {



    let data = {};

    var idUser = req.session.id_user;

    if (req.session.role == 0 || req.session.role == 1) {
        if ([req.params.id] == 0) {
            this._connection.query('SELECT dateTicket, typeticket from tickets', function (err, results) {
                if (err) data = res.json({ data: false, message: err });
                else
                    data = res.json({ data: results });
            });
            this._connection.end();
            return data;
        }
        else {
            this._connection.query('SELECT dateTicket, typeticket from tickets where id_user = ' + [req.params.id], function (err, results) {
                if (err) data = res.json({ data: false, message: err });
                else
                    data = res.json({ data: results });
            });
            this._connection.end();
            return data;
        }
    }
    else {
        this._connection.query('SELECT dateTicket, typeticket from tickets where id_user = ' + idUser, function (err, results) {
            if (err) data = res.json({ data: false, message: err });
            else
                data = res.json({ data: results });
        });
        this._connection.end();
        return data;
    }

}
ApiDAO.prototype.apiuser_info = function (req, res) {


    let data = {};
    var idUser = req.session.id_user;

    this._connection.query('SELECT * from users where id_user = ' + idUser + '', function (err, results) {
        if (err) data = res.json({ data: false, message: err });
        else
            data = res.json({ data: results });
    });
    this._connection.end();
    return data;


}

ApiDAO.prototype.apiusers = function (req, res) {


    this._connection.query('select * from users', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
    this._connection.end();

}



ApiDAO.prototype.apiuser = function (req, res) {



    this._connection.query('select * from users where id_user=?', [req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
    this._connection.end();

}

ApiDAO.prototype.apiuser_add = function (req, res, postData) {

    this._connection.query('UPDATE users SET ? where id_user= ' + [req.params.id] + '', postData, function (error, results, fields) {
        if (error) throw error;
        res.render("admin/profile", { user: req.session.name, role: req.session.role, imgPath: req.session.path, userID: req.session.id_user, siteName: "CoreInd - Indústria 4.0", validacao: {} });
    });
    this._connection.end();


}

ApiDAO.prototype.apiuser_update = function (req, res, postData) {
    this._connection.query('INSERT INTO users SET ?', postData, function (error, results, fields) {
        if (error) throw error;
        console.log(error);
        res.end(JSON.stringify(results));
    });
    this._connection.end();


}

ApiDAO.prototype.apimachines = function (req, res) {
    let data = {};
    this._connection.query('SELECT * from machines m left join locations l on m.locationMachine = l.idLocation left join typemachine t on m.typeMachine = t.idTypeMachine ', function (err, results) {
        if (err) data = res.json({ data: false, message: err });
        else
            data = res.json({ data: results });
    });
    this._connection.end();
    return data;

}


ApiDAO.prototype.apimachine_detail = function (req, res) {
    let data = {};

    this._connection.query('SELECT * FROM tickets t JOIN users u on t.id_user = u.id_user JOIN locations l on t.locationTicket = l.idLocation join machines m on t.id_machine = m.idMachine LEFT JOIN typeticket tt on t.typeTicket = tt.idTypeTicket where idMachine = ' + [req.params.id] + '', function (err, results) {
        if (err) data = res.json({ data: false, message: err });
        else
            data = res.json({ data: results });
    });
    this._connection.end();
    return data;


}

ApiDAO.prototype.apilocations = function (req, res) {

    let data = {};

    this._connection.query('SELECT * from locations order by idLocation desc', function (err, results) {
        if (err) data = res.json({ data: false, message: err });
        else
            data = res.json({ data: results });
    });
    this._connection.end();
    return data;

}

ApiDAO.prototype.apitypemachines = function (req, res) {
    let data = {};
    this._connection.query('SELECT * from typemachine order by idTypeMachine desc', function (err, results) {
        if (err) data = res.json({ data: false, message: err });
        else
            data = res.json({ data: results });
    });
    this._connection.end();
    return data;

}

ApiDAO.prototype.apitm_add = function (req, res, postData) {
    this._connection.query('INSERT INTO typemachine SET ?', postData, function (error, results, fields) {
        if (error) throw error;
        console.log(error);
        res.end(JSON.stringify(results));
    });
    this._connection.end();

}

ApiDAO.prototype.apilo_add = function (req, res, postData) {
    this._connection.query('INSERT INTO locations SET ?', postData, function (error, results, fields) {
        if (error) throw error;
        console.log(error);
        res.end(JSON.stringify(results));
    });
    this._connection.end();

}

ApiDAO.prototype.apimanuals = function (req, res) {
    let data = {};
    this._connection.query('SELECT * from manuals m left join uploads u on m.idManual = u.idMachine left join machines ma on m.id_machineManual = ma.idMachine order by date_addManual desc', function (err, results) {
        if (err) data = res.json({ data: false, message: err });
        else
            data = res.json({ data: results });
    });
    this._connection.end();
    return data;

}

ApiDAO.prototype.apifiles = function (req, res) {
    let data = {};

    this._connection.query('SELECT * from manuals m left join uploads u on m.idManual = u.idMachine left join machines ma on m.id_machineManual = ma.idMachine where u.idMachine =  ' + [req.params.id] + ' order by date_addManual desc', function (err, results) {
        if (err) data = res.json({ data: false, message: err });
        else
            data = res.json({ data: results });
    });
    this._connection.end();
    return data;

}


ApiDAO.prototype.apimanual_detail = function (req, res) {
    let data = {};

    this._connection.query('SELECT * from manuals m left join uploads u on m.idManual = u.idMachine left join machines ma on m.id_machineManual = ma.idMachine where idManual = ' + [req.params.id] + ' order by date_addManual desc', function (err, results) {
        if (err) data = res.json({ data: false, message: err });
        else
            data = res.json({ data: results });
    });
    this._connection.end();
    return data;

}


ApiDAO.prototype.apiget_all_users = function (req, res) {
    let data = {};

    this._connection.query('SELECT * from users order by date desc', function (err, results) {
        if (err) data = res.json({ data: false, message: err });
        else
            data = res.json({ data: results });
    });
    this._connection.end();
    return data;

}

ApiDAO.prototype.apigettickets = function (req, res) {

    let data = {};
    this._connection.query('SELECT titleTicket as title, dateTicket as start, descriptionTicket as description, idTicket as url, titleCriticality, timeCriticality as end, colorCriticality as color, name as name from tickets t left join criticality c on t.criticalityTicket = c.idCriticality left join users u on t.id_user = u.id_user', function (err, results) {
        if (err) data = res.json({ data: false, message: err });
        else
            data = res.json({ data: results });
    });
    this._connection.end();
    return data;
}


ApiDAO.prototype.apiGetAllTickets = function (req, res, id) {


    let data = {};
    var idUser = req.session.id_user;
    this._connection.query('SELECT * FROM tickets t LEFT JOIN users u on t.id_user = u.id_user JOIN locations l on t.locationTicket = l.idLocation join machines m on t.id_machine = m.idMachine LEFT JOIN typeticket tt on t.typeTicket = tt.idTypeTicket LEFT JOIN criticality c on t.criticalityTicket = c.idCriticality order by t.dateTicket asc', function (err, results) {
        if (err) data = res.json({ data: false, message: err });
        else
            data = res.json({ data: results });
    });
    this._connection.end();


}


module.exports = function () {
    return ApiDAO;
}

