
module.exports.tickets = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {


        var connection = application.config.dbConnection();
        var apiModel = new application.app.models.ApiDAO(connection);



        apiModel.apiTickets(req, res, function (error, result) { });
    }

}

module.exports.api_get_tickets = function (application, req, res) {

    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {

        if (req.session.role == 0 || req.session.role == 1) {
            var connection = application.config.dbConnection();
            var apiModel = new application.app.models.ApiDAO(connection);

            apiModel.apiGetAllTickets(req, res, function (error, result) { });
        }
        else {
            res.render("admin/dashboard", { user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0" });
            return;
        }

    }

}

module.exports.tickets_graph = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {

        var connection = application.config.dbConnection();
        var apiModel = new application.app.models.ApiDAO(connection);

        apiModel.apitickets_graph(req, res, function (error, result) { });

    }

}

module.exports.tickets_graph_mes = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        var connection = application.config.dbConnection();
        var apiModel = new application.app.models.ApiDAO(connection);

        apiModel.apitickets_graph_mes(req, res, function (error, result) { });
    }


}

module.exports.user_info = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        var connection = application.config.dbConnection();
        var apiModel = new application.app.models.ApiDAO(connection);

        apiModel.apiuser_info(req, res, function (error, result) { });
    }

}

module.exports.users = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        var connection = application.config.dbConnection();
        var apiModel = new application.app.models.ApiDAO(connection);

        apiModel.apiusers(req, res, function (error, result) { });
    }

}

module.exports.user = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        var connection = application.config.dbConnection();
        var apiModel = new application.app.models.ApiDAO(connection);

        apiModel.apiuser(req, res, function (error, result) { });
    }

}


module.exports.user_add = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        var connection = application.config.dbConnection();
        var apiModel = new application.app.models.ApiDAO(connection);

        var postData = req.body;


        apiModel.apiuser_add(req, res, postData, function (error, result) { });
    }

}

module.exports.user_update = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        var connection = application.config.dbConnection();
        var apiModel = new application.app.models.ApiDAO(connection);

        var postData = req.body;


        apiModel.apiuser_update(req, res, postData, function (error, result) { });
    }

}

module.exports.machines = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        var connection = application.config.dbConnection();
        var apiModel = new application.app.models.ApiDAO(connection);

        apiModel.apimachines(req, res, function (error, result) { });
    }

}

module.exports.machine_detail = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        var connection = application.config.dbConnection();
        var apiModel = new application.app.models.ApiDAO(connection);

        apiModel.apimachine_detail(req, res, function (error, result) { });
    }

}

module.exports.locations = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        var connection = application.config.dbConnection();
        var apiModel = new application.app.models.ApiDAO(connection);

        apiModel.apilocations(req, res, function (error, result) { });
    }

}



module.exports.typemachines = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        var connection = application.config.dbConnection();
        var apiModel = new application.app.models.ApiDAO(connection);

        apiModel.apitypemachines(req, res, function (error, result) { });
    }

}


module.exports.tm_add = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        var connection = application.config.dbConnection();
        var apiModel = new application.app.models.ApiDAO(connection);

        var postData = req.body;

        apiModel.apitm_add(req, res, postData, function (error, result) { });
    }

}

module.exports.lo_add = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        var connection = application.config.dbConnection();
        var apiModel = new application.app.models.ApiDAO(connection);

        var postData = req.body;

        apiModel.apilo_add(req, res, postData, function (error, result) { });
    }

}

module.exports.manuals = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        var connection = application.config.dbConnection();
        var apiModel = new application.app.models.ApiDAO(connection);

        apiModel.apimanuals(req, res, function (error, result) { });
    }

}

module.exports.files = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        var connection = application.config.dbConnection();
        var apiModel = new application.app.models.ApiDAO(connection);

        apiModel.apifiles(req, res, function (error, result) { });
    }

}

module.exports.manual_detail = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        var connection = application.config.dbConnection();
        var apiModel = new application.app.models.ApiDAO(connection);

        apiModel.apimanual_detail(req, res, function (error, result) { });
    }

}

module.exports.get_all_users = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        var connection = application.config.dbConnection();
        var apiModel = new application.app.models.ApiDAO(connection);

        apiModel.apiget_all_users(req, res, function (error, result) { });
    }

}


module.exports.get_tickets = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        var connection = application.config.dbConnection();
        var apiModel = new application.app.models.ApiDAO(connection);

        apiModel.apigettickets(req, res, function (error, result) { });
    }

}


