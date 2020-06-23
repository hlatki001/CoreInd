module.exports.tickets = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {

        if (req.session.role == 0 || req.session.role == 1) {
            res.render("admin/reports", { user: req.session.name, role: req.session.role, imgPath: req.session.path, userID: req.session.id_user, siteName: "CoreInd - Indústria 4.0", validacao: {}, avisos: {} });
            return;
        }
        else {
            res.render("admin/dashboard", { user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0" });
            return;
        }
    }
}
