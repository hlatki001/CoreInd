module.exports.calendar = function (application, req, res) {
	if (req.session.autorizado != true) {
		res.redirect("/login");
		return;
	}
	else {
		res.render("admin/calendar", { user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0" });
		return;
	}
}