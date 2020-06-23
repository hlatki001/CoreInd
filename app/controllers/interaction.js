module.exports.interaction_insert = function (application, req, res) {

    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {

        var interaction = req.body;

        req.assert('titleInteraction', 'Título da interação é obrigatório!').notEmpty();
        req.assert('descriptionInteraction', 'Descrição da interação é obrigatório').notEmpty();

        var erros = req.validationErrors();

        if (erros) {
            var id = req.query;

            var connection = application.config.dbConnection();
            var ticketModel = new application.app.models.TicketsDAO(connection);


            ticketModel.getTicket(id, function (error, result) {
                res.render("admin/os_detail", { ticket: result, imgPath: req.session.path, user: req.session.name, role: req.session.role, id_user: req.session.id, validacao: erros });
            });

        }
        else {

            var idTicket = req.query;
            var connection = application.config.dbConnection();
            var interactionsModel = new application.app.models.InteractionsDAO(connection);

            interactionsModel.insertInteraction(interaction, idTicket, req, function (error, result) {
                //res.render("admin/os_detail", { ticket: result, user: req.session.name, role: req.session.role, id_user: req.session.id, validacao: {} });


                res.redirect("os-detail?id=" + idTicket.id);

            });

        }
    }

}

module.exports.interactions_update = function (application, req, res) {

    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        var interaction = req.body;

        req.assert('titleInteraction', 'Título da interação é obrigatório!').notEmpty();
        req.assert('descriptionInteraction', 'Descrição da interação é obrigatório').notEmpty();

        var erros = req.validationErrors();


        if (erros) {
            var id = req.query;

            var connection = application.config.dbConnection();
            var ticketModel = new application.app.models.TicketsDAO(connection);


            ticketModel.getTicket(id, function (error, result) {
                res.render("admin/os_detail", { ticket: result, imgPath: req.session.path, user: req.session.name, role: req.session.role, id_user: req.session.id, validacao: erros });
            });
        }
        else {
            var interaction = req.body;

            var idTicket = req.query;
            var connection = application.config.dbConnection();
            var interactionsModel = new application.app.models.InteractionsDAO(connection);


            interactionsModel.updateInteraction(idTicket, interaction, req, function (error, result) {
                //res.render("admin/os_detail", { ticket: result, user: req.session.name, role: req.session.role, id_user: req.session.id, validacao: {} });


                res.redirect("os-detail?id=" + idTicket.id);

            });

        }
    }
}


module.exports.interactions_delete = function (application, req, res) {

    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {

        var connection = application.config.dbConnection();
        var interactionsModel = new application.app.models.InteractionsDAO(connection);


        var idTicket = req.query;

        interactionsModel.deleteInteraction(idTicket, function (error, result) {
            res.redirect("os-detail?id=" + idTicket.idTicket);
        });
    }
}


