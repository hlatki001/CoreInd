module.exports.machines = function (application, req, res) {

    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        res.render("admin/machines", { user: req.session.name, role: req.session.role, imgPath: req.session.path, userID: req.session.id_user, siteName: "CoreInd - Indústria 4.0", validacao: {} });
    }
}

module.exports.machine_details = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {

        var connection = application.config.dbConnection();
        var machineModel = new application.app.models.MachinesDAO(connection);
        var id = req.query;

        console.log(id);

        machineModel.getMachineDetails(id, req, res, function (error, result) { });
    }
}


module.exports.machine_add = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {

        res.render("admin/machine-add", { user: req.session.name, role: req.session.role, imgPath: req.session.path, userID: req.session.id_user, siteName: "CoreInd - Indústria 4.0", validacao: {} });
    }
}

module.exports.machines_edit = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {

        var connection = application.config.dbConnection();
        var machineModel = new application.app.models.MachinesDAO(connection);
        var id = req.query;


        machineModel.editMachineDetails(id, req, res, function (error, result) { });

    }
}




module.exports.machine_insert = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {

        var machine = req.body;

        req.assert('tileMachine', 'Título é obrigatório').notEmpty();
        req.assert('descriptionMachine', 'Resumo é obrigatório').notEmpty();
        req.assert('techdescriptionMachine', 'Resumo Técnico é obrigatório').notEmpty();

        var erros = req.validationErrors();

        if (erros) {


            res.render("admin/machine-add", { user: req.session.name, role: req.session.role, imgPath: req.session.path, userID: req.session.id_user, siteName: "CoreInd - Indústria 4.0", validacao: erros });

            return;
        }
        else {
            var connection = application.config.dbConnection();
            var machineModel = new application.app.models.MachinesDAO(connection);

            machineModel.insertMachine(machine, res, function (error, result) {
                res.redirect("machines");
            });

        }
    }
}

module.exports.machines_update = function (application, req, res) {

    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        var machine = req.body;
        var id = req.query;


        req.assert('tileMachine', 'Título é obrigatório').notEmpty();
        req.assert('descriptionMachine', 'Resumo é obrigatório').notEmpty();
        req.assert('techdescriptionMachine', 'Resumo Técnico é obrigatório').notEmpty();

        var erros = req.validationErrors();

        if (erros) {


            res.render("admin/machine-add", { user: req.session.name, role: req.session.role, imgPath: req.session.path, userID: req.session.id_user, siteName: "CoreInd - Indústria 4.0", validacao: erros });

            return;
        }
        else {
            var connection = application.config.dbConnection();
            var machineModel = new application.app.models.MachinesDAO(connection);

            machineModel.updateMachine(machine, id, function (error, result) {
                res.redirect("machines");
            });

        }
    }
}


module.exports.machine_delete = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        var id = req.body.idMachine;

        var connection = application.config.dbConnection();
        var machineModel = new application.app.models.MachinesDAO(connection);

        machineModel.deleteMachine(id, res, res, function (error, result) { });
    }


}


module.exports.type_machines = function (application, req, res) {

    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        res.render("admin/typemachines", { user: req.session.name, role: req.session.role, imgPath: req.session.path, userID: req.session.id_user, siteName: "CoreInd - Indústria 4.0", validacao: {} });
    }
}


module.exports.type_machines_insert = function (application, req, res) {

    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        var item = req.body;

        req.assert('titleTypeMachine', 'Título é obrigatório').notEmpty();
        req.assert('descriptionTypeMachine', 'Resumo é obrigatório').notEmpty();



        var erros = req.validationErrors();

        if (erros) {
            res.render("admin/typemachines", { user: req.session.name, role: req.session.role, imgPath: req.session.path, userID: req.session.id_user, siteName: "CoreInd - Indústria 4.0", validacao: erros });

        }
        else {

            var connection = application.config.dbConnection();
            var machineModel = new application.app.models.MachinesDAO(connection);

            machineModel.insertTypeMachine(item, res, req, function (error, result) { });
        }


    }
}

module.exports.type_machines_update = function (application, req, res) {

    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        var item = req.body;
        var id = req.body.idTypeMachine;

        req.assert('titleTypeMachine', 'Título é obrigatório').notEmpty();
        req.assert('descriptionTypeMachine', 'Resumo é obrigatório').notEmpty();



        var erros = req.validationErrors();

        if (erros) {
            res.render("admin/typemachines", { user: req.session.name, role: req.session.role, imgPath: req.session.path, userID: req.session.id_user, siteName: "CoreInd - Indústria 4.0", validacao: erros });

        }
        else {

            var connection = application.config.dbConnection();
            var machineModel = new application.app.models.MachinesDAO(connection);

            machineModel.updateTypeMachine(id, item, res, req, function (error, result) { });
        }


    }

}

module.exports.type_machines_delete = function (application, req, res) {

    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {

        var id = req.body.idTypeMachine;

        var connection = application.config.dbConnection();
        var machineModel = new application.app.models.MachinesDAO(connection);

        machineModel.deleteTypeMachine(id, res, function (error, result) { });
    }
}


