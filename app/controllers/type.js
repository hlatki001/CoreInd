module.exports.type_ticket_general = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {

        var connection = application.config.dbConnection();
        var typesModel = new application.app.models.TypeTicketDAO(connection);
        typesModel.getTypes(function (error, result) {
            res.render("admin/type_general", { siteName: "CoreInd - Indústria 4.0", user: req.session.name, role: req.session.role, imgPath: req.session.path, types: result, validacao: {} });
        });
    }

}


module.exports.type_ticket_insert = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        var type = req.body;

        req.assert('titleTypeTicket', 'Título é obrigatório').notEmpty();
        req.assert('descriptionTypeTicket', 'Resumo é obrigatório').notEmpty()

        var erros = req.validationErrors();

        if (erros) {
            var connection = application.config.dbConnection();
            var typesModel = new application.app.models.TypeTicketDAO(connection);
            typesModel.getTypes(req, function (error, result) {
                res.render("admin/type_general", { siteName: "CoreInd - Indústria 4.0", user: req.session.name, role: req.session.role, imgPath: req.session.path, id_user: req.session.id, validacao: erros, types: result });
            });
        }
        else {
            var connection = application.config.dbConnection();
            var typesModel = new application.app.models.TypeTicketDAO(connection);

            typesModel.insertTypes(type, function (error, result) {
                res.redirect("type-general");
            });

        }
    }
}

module.exports.type_ticket_update = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        var type = req.body;       


        req.assert('titleTypeTicket', 'Título é obrigatório').notEmpty();
        req.assert('descriptionTypeTicket', 'Resumo é obrigatório').notEmpty()

        var erros = req.validationErrors();

        if (erros) {

            var connection = application.config.dbConnection();
            var typesModel = new application.app.models.TypeTicketDAO(connection);
            typesModel.getTypes(function (req, error, result) {
                res.render("admin/type_general", { siteName: "CoreInd - Indústria 4.0", user: req.session.name, role: req.session.role, imgPath: req.session.path, id_user: req.session.id, validacao: erros, types: result });
            });
        }
        else {

            var id = req.body.idTypeTicket;

            var connection = application.config.dbConnection();
            var typesModel = new application.app.models.TypeTicketDAO(connection);

            typesModel.updateTypes(id, type, function (error, result) {
                res.redirect("type-general");
            });

        }
    }
}

module.exports.type_ticket_delete = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        var id = req.query;

        var connection = application.config.dbConnection();
        var typesModel = new application.app.models.TypeTicketDAO(connection);

        typesModel.deleteTypes(req, id, function (error, result) {
            res.redirect("type-general");
        });


    }
}





