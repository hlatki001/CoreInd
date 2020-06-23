
module.exports.getmanuals = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        res.render("admin/manuals", { user: req.session.name, role: req.session.role, imgPath: req.session.path, userID: req.session.id_user, siteName: "CoreInd - Indústria 4.0", validacao: {}, avisos: {} });
        return;
    }
}


module.exports.manual_details = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {

        var connection = application.config.dbConnection();
        var manualModel = new application.app.models.ManualDAO(connection);
        var id = req.query;

        manualModel.getManualDetails(id, req, res, function (error, result) { });
    }
}




module.exports.manual_insert = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        var idMachine = req.body.idMachine;

        var files = req.files;

        var connection = application.config.dbConnection();
        var manualModel = new application.app.models.ManualDAO(connection);

        manualModel.insertFiles(idMachine, files, req, res, function (error, result) { });
    }
}

module.exports.manual_delete = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        var idManual = req.body.idManual;
        var pathManual = req.body.pathManual;


        var connection = application.config.dbConnection();
        var manualModel = new application.app.models.ManualDAO(connection);

        manualModel.deleteFiles(idManual, pathManual, req, res, function (error, result) { });
    }
}



module.exports.getmanualsperid = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        let data = {};

        var connection = application.config.dbConnection();

        connection.query('SELECT * from manuals m left join uploads u on m.idManual = u.idMachine left join machines ma on m.id_machineManual = ma.idMachine where m.id_machineManual = ' + [req.params.id] + '', function (err, results) {
            if (err) data = res.json({ data: false, message: err });
            else
                data = res.json({ data: results });
        });
        return data;
    }

}


