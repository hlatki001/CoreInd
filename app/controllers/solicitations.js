module.exports.solicitations = function (application, req, res, config) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {

        res.render("admin/solicitations", { user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0", validacao: {}, erros: {}, validacaoEdit: {} });


    }
}
module.exports.api_solicitations = function (application, req, res, config) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {

        var connection = application.config.dbConnection();
        var solicitationsModel = new application.app.models.SolicitationsDAO(connection);

        solicitationsModel.apiSolicitations(req, res, function (error, result) { });

    }

}

module.exports.solicitations_insert = function (application, req, res, config) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {

        var dadosForm = req.body;

        if (dadosForm.openOS) {
            var connection = application.config.dbConnection();
            var solicitationsModel = new application.app.models.SolicitationsDAO(connection);

            solicitationsModel.insertTicket(dadosForm, req, res, function (error, result) { });
        }
        if (dadosForm.cancelSS) {
            var connection = application.config.dbConnection();
            var solicitationsModel = new application.app.models.SolicitationsDAO(connection);

            solicitationsModel.cancelSS(dadosForm, req, res, function (error, result) { });
        }
        if (dadosForm.doubleSS) {
            var connection = application.config.dbConnection();
            var solicitationsModel = new application.app.models.SolicitationsDAO(connection);

            solicitationsModel.doubleSS(dadosForm, req, res, function (error, result) { });
        }

        else {

            var dadosForm = req.body;

            req.assert('descriptionSolicitation', 'Descrição não pode ser vazia').notEmpty();
            req.assert('dateSolicitation', 'Data da Solicitação não pode ser vazia').notEmpty();
            req.assert('locationSolicitation', 'Setor/Localização não pode ser vazio').notEmpty();
            req.assert('machineSolicitation', 'O equipamento precisa estar preenchido').notEmpty();

            var erros = req.validationErrors();

            if (erros) {
                res.render("admin/solicitations", { user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0", validacao: erros, erros: {}, validacaoEdit: {} });
                return;
            }
            else {


                var connection = application.config.dbConnection();
                var solicitationsModel = new application.app.models.SolicitationsDAO(connection);

                solicitationsModel.insertSolicitations(dadosForm, function (error, result) {
                    res.redirect('/solicitations');
                });
            }

        }

    }
}

module.exports.solicitations_insert2 = function (application, req, res, config) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {

        var dadosForm = req.body;

        req.assert('descriptionSolicitation', 'Descrição não pode ser vazia').notEmpty();
        req.assert('dateSolicitation', 'Data da Solicitação não pode ser vazia').notEmpty();
        req.assert('locationSolicitation', 'Setor/Localização não pode ser vazio').notEmpty();
        req.assert('machineSolicitation', 'O equipamento precisa estar preenchido').notEmpty();

        var erros = req.validationErrors();

        if (erros) {
            res.render("admin/solicitations", { user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0", validacao: erros, erros: {}, validacaoEdit: {} });
            return;
        }
        else {


            var connection = application.config.dbConnection();
            var solicitationsModel = new application.app.models.SolicitationsDAO(connection);

            solicitationsModel.insertSolicitations(dadosForm, function (error, result) {
                res.redirect('/solicitations');
            });
        }

    }
}

module.exports.solicitations_update = function (application, req, res, config) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {

        var dadosForm = req.body;
        var id = req.body.idSolicitation;

        req.assert('descriptionSolicitation', 'Descrição não pode ser vazia').notEmpty();
        req.assert('dateSolicitation', 'Data da Solicitação não pode ser vazia').notEmpty();
        req.assert('locationSolicitation', 'Setor/Localização não pode ser vazio').notEmpty();
        req.assert('machineSolicitation', 'O equipamento precisa estar preenchido').notEmpty();

        var errosEdit = req.validationErrors();

        if (errosEdit) {
            res.render("admin/solicitations", { user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0", validacaoEdit: errosEdit, erros: {}, validacao: {} });
            return;
        }
        else {
            var connection = application.config.dbConnection();
            var solicitationsModel = new application.app.models.SolicitationsDAO(connection);

            solicitationsModel.updateSolicitations(dadosForm, id, function (error, result) {
                res.redirect('/solicitations');
            });
        }




    }
}
module.exports.solicitations_delete = function (application, req, res, config) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        var id = req.body.idSolicitation;

        console.log(id);

        var connection = application.config.dbConnection();
        var solicitationsModel = new application.app.models.SolicitationsDAO(connection);

        solicitationsModel.deleteSolicitations(id, function (error, result) {
            res.redirect('/solicitations');
        });


    }
}