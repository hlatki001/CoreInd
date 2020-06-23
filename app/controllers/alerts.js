
module.exports.alerts = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        var userID = req.session.id_user;
        let result = {};


        var connection = application.config.dbConnection();

        if (req.session.role == 0 || req.session.role == 1) {

            connection.query('SELECT * from alerts a left join users u on a.idUser = u.id_user order by dateAlert desc', function (err, results) {
                if (err) result = res.json({ result: false, message: err });
                else
                    result = res.json({ results: results });
            });
            connection.end();
            return result;
        }
        else {
            connection.query('SELECT * from alerts where idUser = ' + userID + ' order by dateAlert desc', function (err, results) {
                if (err) result = res.json({ result: false, message: err });
                else
                    result = res.json({ results: results });
            });
            connection.end();
            return result;
        }

    }
}

module.exports.view_alerts = function (application, req, res) {

    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        res.render("admin/alerts", { user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0" });
        return;
    }


}

module.exports.alert = function (application, req, res) {

    let result = {};

    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {

        var connection = application.config.dbConnection();
        var postData = req.body.data;


        connection.query('UPDATE alerts set statusAlert = 1 where idAlert = ' + postData + '', function (err, results) {
            if (err) result = res.json({ result: false, message: err });
            else
                result = res.json({ results: results });
        });
        return result;
    }

}

module.exports.alert_delete = function (application, req, res) {


    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {

        var connection = application.config.dbConnection();
        var id = req.body.idAlert;

        var alertsModel = new application.app.models.AlertsDAO(connection);


        alertsModel.deleteAlerts(id, function (error, result) {
            res.redirect("alerts");
        });

    }

}





