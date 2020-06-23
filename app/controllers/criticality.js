module.exports.criticality = function (application, req, res) {

    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {

        res.render("admin/criticality", { user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0", validacao: {}, erros: {} });
        return;

    }

}

module.exports.api_criticality = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {

    var connection = application.config.dbConnection();
    var criticalityModel = new application.app.models.CriticalityDAO(connection);

    criticalityModel.getCriticality(req, res, function (error, result) { });
    }

}

module.exports.criticality_add = function (application, req, res) {

    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {

        res.render("admin/criticality-add", { user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0", validacao: {} });
        return;

    }

}

module.exports.criticality_insert = function (application, req, res) {

    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {

        var values = req.body;

        req.assert('titleCriticality', 'Título é obrigatório').notEmpty();
        req.assert('descriptionCriticality', 'Resumo é obrigatório').notEmpty();
        req.assert('timeCriticality', 'Tempo de atendimento é obrigatório').notEmpty();



        var erros = req.validationErrors();

        if (erros) {
            res.render("admin/criticality-add", { user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0", validacao: erros });


        }
        else {
            var connection = application.config.dbConnection();
            var criticalityModel = new application.app.models.CriticalityDAO(connection);

            criticalityModel.insertCriticality(values, function (error, result) {
                res.redirect('criticality');
            });

        }

    }

}

module.exports.criticality_update = function (application, req, res) {

    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {

        var values = req.body;
        var id = req.body.idCriticality;

        req.assert('titleCriticality', 'Título é obrigatório').notEmpty();
        req.assert('descriptionCriticality', 'Resumo é obrigatório').notEmpty();
        req.assert('timeCriticality', 'Tempo de atendimento é obrigatório').notEmpty();



        var erros = req.validationErrors();

        if (erros) {
            res.render("admin/criticality-add", { user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0", validacao: erros });


        }
        else {
            var connection = application.config.dbConnection();
            var criticalityModel = new application.app.models.CriticalityDAO(connection);

            criticalityModel.updateCriticality(values, id, function (error, result) {
                res.redirect('criticality');
            });

        }

    }

}

module.exports.criticality_delete = function (application, req, res) {

    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {

        var id = req.body.idCriticality;


        var connection = application.config.dbConnection();
        var criticalityModel = new application.app.models.CriticalityDAO(connection);

        criticalityModel.deleteCriticality(id, function (error, result) {
            res.redirect('criticality');
        });



    }

}



