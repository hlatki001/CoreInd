
module.exports.dashboard = function (application, req, res) {
	if (req.session.autorizado != true) {
		res.redirect("/login");
		return;
	}
	else {
		res.render("admin/dashboard", { user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0" });
		return;
	}
}

module.exports.os_geral = function (application, req, res) {
	if (req.session.autorizado != true) {
		res.redirect("/login");
		return;
	}
	else {

		var id_user = req.session.id_user;
		var connection = application.config.dbConnection();
		var ticketsModel = new application.app.models.TicketsDAO(connection);



		ticketsModel.getTickets(id_user, req, function (error, result) {
			res.render("admin/os_geral", { user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0", tickets: result });
		});
	}
}

module.exports.os_open = function (application, req, res) {
	if (req.session.autorizado != true) {
		res.redirect("/login");
		return;
	}
	else {

		if (req.session.role == 0 || req.session.role == 1) {

			var connection = application.config.dbConnection();
			var ticketsModel = new application.app.models.TicketsDAO(connection);
			ticketsModel.getTicketsParam(req, res, function (error, result) {
			});

		}
		else {
			res.render("admin/dashboard", { user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0" });
			return;
		}



	}
}

module.exports.os_insert = function (application, req, res) {

	if (req.session.autorizado != true) {
		res.redirect("/login");
		return;
	}
	else {

		if (req.session.role == 0 || req.session.role == 1) {



			var ticket = req.body;

			req.assert('titleTicket', 'Título é obrigatório').notEmpty();
			req.assert('descriptionTicket', 'Resumo é obrigatório').notEmpty();
			req.assert('descriptionTicket', 'Resumo deve conter entre 10 e 100 caracteres').len(10, 100);
			req.assert('locationTicket', 'Localização é obrigatório').notEmpty();
			req.assert('id_machine', 'O equipamento é obrigatório').notEmpty();



			var erros = req.validationErrors();

			if (erros) {
				var connection = application.config.dbConnection();
				var ticketsModel = new application.app.models.TicketsDAO(connection);


				ticketsModel.getTicketsDetailsParams(req, res, erros, ticket, function (error, result) {

				});

			}
			else {
				var connection = application.config.dbConnection();
				var ticketsModel = new application.app.models.TicketsDAO(connection);

				ticketsModel.insertTicket(ticket, req, res, function (error, result) { });

			}
		}
		else {
			res.render("admin/dashboard", { user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0" });
			return;
		}

	}
}

module.exports.os_detail = function (application, req, res) {

	if (req.session.autorizado != true) {
		res.redirect("/login");
		return;
	}
	else {

		var connection = application.config.dbConnection();
		var ticketModel = new application.app.models.TicketsDAO(connection);
		var id = req.query;

		console.log(id);

		ticketModel.getTicketDetails(id, req, res, function (error, result) {
		});
	}
}

module.exports.os_edit = function (application, req, res) {

	if (req.session.autorizado != true) {
		res.redirect("/login");
		return;
	}
	else {

		if (req.session.role == 0 || req.session.role == 1) {

			var connection = application.config.dbConnection();
			var ticketModel = new application.app.models.TicketsDAO(connection);


			var id = req.query;

			ticketModel.getTicket(id, req, res, function (error, result) {

			});

		}
		else {
			res.render("admin/dashboard", { user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0" });
			return;
		}

	}
}

module.exports.os_update = function (application, req, res) {

	if (req.session.autorizado != true) {
		res.redirect("/login");
		return;
	}
	else {

		if (req.session.role == 0 || req.session.role == 1) {
			var ticketB = req.body;
			var ticket = req.body;

			req.assert('titleTicket', 'Título é obrigatório').notEmpty();
			req.assert('descriptionTicket', 'Resumo é obrigatório').notEmpty();
			req.assert('descriptionTicket', 'Resumo deve conter entre 10 e 100 caracteres').len(10, 100);
			req.assert('locationTicket', 'Localização é obrigatório').notEmpty();
			req.assert('id_machine', 'O equipamento é obrigatório').notEmpty();

			var erros = req.validationErrors();

			if (erros) {
				var connection = application.config.dbConnection();
				var ticketModel = new application.app.models.TicketsDAO(connection);


				var id = req.query;

				ticketModel.getTicketError(id, req, res, erros, function (error, result) {

				});
				return;
			}
			else {
				var connection = application.config.dbConnection();
				var ticketModel = new application.app.models.TicketsDAO(connection);


				var id = req.query;
				ticketModel.updateTicket(id, ticketB, req, res, function (error, result) { });

			}
		}
		else {
			res.render("admin/dashboard", { user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0" });
			return;
		}
	}
}

module.exports.os_delete = function (application, req, res) {

	if (req.session.autorizado != true) {
		res.redirect("/login");
		return;
	}
	else {

		if (req.session.role == 0 || req.session.role == 1) {

			var connection = application.config.dbConnection();
			var ticketModel = new application.app.models.TicketsDAO(connection);


			var id = req.query;

			ticketModel.deleteTicket(id, function (error, result) {
				res.redirect('os-geral');
			});

		}
		else {
			res.render("admin/dashboard", { user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0" });
			return;
		}

	}
}

module.exports.locations_geral = function (application, req, res) {
	if (req.session.autorizado != true) {
		res.redirect("/login");
		return;
	}
	else {

		if (req.session.role == 0 || req.session.role == 1) {


			var connection = application.config.dbConnection();
			var locationsModel = new application.app.models.LocationsDAO(connection);
			locationsModel.getLocations(function (error, result) {
				res.render("admin/locations_geral", { user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0", locations: result });
			});
		}
		else {
			res.render("admin/dashboard", { user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0" });
			return;
		}

	}
}


module.exports.locations_open = function (application, req, res) {
	if (req.session.autorizado != true) {
		res.redirect("/login");
		return;
	}
	else {

		if (req.session.role == 0 || req.session.role == 1) {
			res.render("admin/locations_open", { user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0", validacao: {} });


		}
		else {
			res.render("admin/dashboard", { user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0" });
			return;
		}
	}
}

module.exports.locations_insert = function (application, req, res) {

	if (req.session.autorizado != true) {
		res.redirect("/login");
		return;
	}
	else {

		if (req.session.role == 0 || req.session.role == 1) {


			var location = req.body;

			req.assert('titleLocation', 'Título é obrigatório').notEmpty();
			req.assert('descriptionLocation', 'Resumo é obrigatório').notEmpty()

			var erros = req.validationErrors();

			if (erros) {
				res.render("admin/locations_open", { user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0", validacao: erros, location: location });
				return;
			}
			else {
				var connection = application.config.dbConnection();
				var locationsModel = new application.app.models.LocationsDAO(connection);

				locationsModel.insertLocations(location, req, function (error, result) {
					res.redirect('locations-geral');
				});

			}
		}
		else {
			res.render("admin/dashboard", { user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0" });
			return;
		}


	}
}


module.exports.locations_detail = function (application, req, res) {

	if (req.session.autorizado != true) {
		res.redirect("/login");
		return;
	}
	else {

		if (req.session.role == 0 || req.session.role == 1) {

			var connection = application.config.dbConnection();
			var locationModel = new application.app.models.LocationsDAO(connection);


			var id = req.query;

			locationModel.getLocation(id, function (error, result) {
				res.render("admin/locations_detail", { location: result, user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0", validacao: {} });
			});
		}
		else {
			res.render("admin/dashboard", { user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0" });
			return;
		}


	}
}

module.exports.locations_edit = function (application, req, res) {

	if (req.session.autorizado != true) {
		res.redirect("/login");
		return;
	}
	else {

		if (req.session.role == 0 || req.session.role == 1) {
			var connection = application.config.dbConnection();
			var locationModel = new application.app.models.LocationsDAO(connection);


			var id = req.query;

			locationModel.getLocation(id, function (error, result) {
				res.render("admin/locations_edit", { location: result, user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0", validacao: {} });
			});

		}
		else {
			res.render("admin/dashboard", { user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0" });
			return;
		}


	}
}

module.exports.locations_update = function (application, req, res) {

	if (req.session.autorizado != true) {
		res.redirect("/login");
		return;
	}
	else {

		if (req.session.role == 0 || req.session.role == 1) {

			var location = req.body;

			req.assert('titleLocation', 'Título é obrigatório').notEmpty();
			req.assert('descriptionLocation', 'Descrição é obrigatório').notEmpty();

			var erros = req.validationErrors();

			if (erros) {
				res.render("admin/locations_edit", { location: result, user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0", validacao: erros });

				return;
			}
			else {
				var connection = application.config.dbConnection();
				var locationModel = new application.app.models.LocationsDAO(connection);


				var id = req.query;

				locationModel.updateLocation(id, location, req, function (error, result) {
					res.render("admin/locations_detail", { location: result, user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0", validacao: {} });
				});
			}
		}
		else {
			res.render("admin/dashboard", { user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0" });
			return;
		}

	}
}


module.exports.locations_delete = function (application, req, res) {

	if (req.session.autorizado != true) {
		res.redirect("/login");
		return;
	}
	else {

		if (req.session.role == 0 || req.session.role == 1) {
			var connection = application.config.dbConnection();
			var locationModel = new application.app.models.LocationsDAO(connection);


			var id = req.query;

			locationModel.deleteLocation(id, function (error, result) {
				res.redirect('locations-geral');
			});

		}
		else {
			res.render("admin/dashboard", { user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0" });
			return;
		}


	}
}

module.exports.ticket_delete = function (application, req, res) {

	if (req.session.autorizado != true) {
		res.redirect("/login");
		return;
	}
	else {

		if (req.session.role == 0 || req.session.role == 1) {
			var connection = application.config.dbConnection();
			var ticketModel = new application.app.models.TicketsDAO(connection);


			var id = req.body.idTicket;
			var id2 = req.body.idMachine;


			ticketModel.deleteTicket2(id, function (error, result) {
				res.redirect('machine-details?id=' + id2);
			});

		}
		else {
			res.render("admin/dashboard", { user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0" });
			return;
		}


	}
}

module.exports.user_rights = function (application, req, res) {
	if (req.session.autorizado != true) {
		res.redirect("/login");
		return;
	}
	else {

		if (req.session.role == 0 || req.session.role == 1) {

			res.render("admin/user-rights", { erros: {}, user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0", validacao: {} });
			return;
		}
		else {
			res.render("admin/dashboard", { user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0" });
			return;
		}

	}
}
