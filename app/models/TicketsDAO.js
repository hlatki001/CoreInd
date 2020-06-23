var moment = require('moment');

function TicketsDAO(connection) {
	this._connection = connection;
}

TicketsDAO.prototype.getTickets = function (id_user, req, callback) {

	if (req.session.role == 0 || req.session.role == 1) {
		this._connection.query('SELECT * FROM tickets t LEFT JOIN users u on t.id_user = u.id_user JOIN locations l on t.locationTicket = l.idLocation join machines m on t.id_machine = m.idMachine LEFT JOIN typeticket tt on t.typeTicket = tt.idTypeTicket LEFT JOIN criticality c on t.criticalityTicket = c.idCriticality order by t.dateTicket asc', callback);
	}
	else {
		this._connection.query('SELECT * FROM tickets t LEFT JOIN users u on t.id_user = u.id_user JOIN locations l on t.locationTicket = l.idLocation join machines m on t.id_machine = m.idMachine LEFT JOIN typeticket tt on t.typeTicket = tt.idTypeTicket LEFT JOIN criticality c on t.criticalityTicket = c.idCriticality where t.id_user = ' + id_user + ' order by t.dateTicket asc', callback);
	}

	this._connection.end();

}



TicketsDAO.prototype.insertTicket = function (tickets, req, res) {


	var teste = {
		titleTicket: tickets.titleTicket,
		descriptionTicket: tickets.descriptionTicket,
		locationTicket: tickets.locationTicket,
		id_machine: tickets.id_machine,
		id_user: tickets.id_user,
		statusTicket: tickets.statusTicket,
		dateTicket: tickets.dateTicket,
		typeTicket: tickets.typeTicket,
		criticalityTicket: tickets.criticalityTicket
	}


	var now = moment().format("DD/MM/YYYY HH:mm:ss");

	var alert = {
		titleAlert: "Uma nova OS foi registrada: " + tickets.titleTicket,
		statusAlert: 0,
		dateAlert: now,
		idUser: req.session.id_user,
		typeAlert: "Alerta"
	}

	var nodemailer = require('nodemailer');

	let transporter = nodemailer.createTransport({
		host: "smtp.uni5.net",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: "chamados@dotsolucoes.com.br", // generated ethereal user
			pass: "agz9479hlA" // generated ethereal password
		}
	});

	var htmlBody = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xml:lang="pt" lang="pt"><head>' +
		'<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"><title></title>' +
		'<meta name="author" content="suporte">' +
		'<style>' +
		'.txt_padrao	{font-family:Arial;font-size:12px}' +
		'#bold		{font-weight:bold;}' +
		'</style>' +
		'</head>' +
		'<body leftmargin="5" topmargin="5" marginheight="0" smarginwidth="0">' +
		'<table width="775" border="0" cellpadding="2" cellspacing="0">' +
		'<tr><td height="60" width="775" colspan="3"><img src="https://dqnkcwgy21udk.cloudfront.net/cliente/tigra/sistema/images/738047613Logo_Novo143.gif" border="0" alt="Chamados Tigra Consult" title="Chamados Tigra Consult" width="143" height="46"></td></tr>' +

		'<tr>' +
		'<td height="35" align="right"><img src="https://dqnkcwgy21udk.cloudfront.net/sistema/layout/images/email/ico_visto.gif" width="25" height="25" border="0" alt=""></td>' +
		'<td width="100" class="txt_padrao" align="right">N° do Chamado:</td>' +
		'<td width="650" class="txt_padrao" id="bold">&nbsp;0220-000062</td>' +
		'</tr>' +

		'<tr>' +
		'<td width="35">&nbsp;</td>' +
		'<td width="100" class="txt_padrao" align="right">Data - Hora:</td>' +
		'<td width="650" class="txt_padrao" id="bold">&nbsp;' + tickets.dateTicket + '</td>' +
		'</tr>' +

		'<tr><td colspan="3"><hr></td></tr>' +
		'<tr>' +
		'<td>&nbsp;</td>' +
		'<td class="txt_padrao" align="right">Assunto:</td>' +
		'<td class="txt_padrao" id="bold">&nbsp;' + tickets.titleTicket + '</td>' +
		'</tr>' +

		'</table>' +

		'<table width="775" border="0" cellpadding="2" cellspacing="0">' +

		'<tr>' +
		'<td width="35" height="35" align="right"><img src="https://dqnkcwgy21udk.cloudfront.net/sistema/layout/images/email/ico_visto.gif" width="25" height="25" border="0" alt=""></td>' +
		'<td width="740" class="txt_padrao" id="bold"> Descrição do Chamado:</td>' +
		'</tr>' +

		'</tr>' +
		'<td>&nbsp;</td>' +
		'<td class="txt_padrao">' +

		'' + tickets.descriptionTicket + '' +
		'</td>' +
		'</tr>' +

		'<tr><td colspan="2"><hr></td></tr>' +

		'<tr>' +
		'<td height="35" align="right"><img src="https://dqnkcwgy21udk.cloudfront.net/sistema/layout/images/email/ico_alert.gif" width="25" height="25" border="0" alt=""></td>' +
		'<td class="txt_padrao" id="bold"> Este e-mail é gerado automaticamente.</td>' +
		'</tr>' +

		'<tr><td colspan="2"><hr></td></tr>' +
		'</table>' +

		'<table>' +
		'<tr>' +
		'<td><a href="http://deskmanager.com.br/" target="_blank"><img src="https://dqnkcwgy21udk.cloudfront.net/sistema/layout/images/email/Desk Manager.png"></a></td>' +
		'<td style="color:#808080;font-size:11px;">© 2020 - Todos os direitos reservados.</td>' +
		'<td style="color:#808080;font-size:11px;">Compartilhe</td>' +
		'<td>' +
		'<table>' +
		'<tr>' +
		'<td><a href="http://www.youtube.com/DeskManagerSoftware" target="_blank"><img src="https://dqnkcwgy21udk.cloudfront.net/sistema/layout/images/email/Youtube.png"></a></td>' +
		'<td><a href="https://www.facebook.com/DeskManager" target="_blank"><img src="https://dqnkcwgy21udk.cloudfront.net/sistema/layout/images/email/Facebook.png"></a></td>' +
		'<td><a href="https://blog.deskmanager.com.br" target="_blank"><img src="https://dqnkcwgy21udk.cloudfront.net/sistema/layout/images/email/Blogger.png"></a></td>' +
		'<td><a href="http://www.linkedin.com/company/desk-manager-software" target="_blank"><img src="https://dqnkcwgy21udk.cloudfront.net/sistema/layout/images/email/Linkedin.png"></a></td>' +
		'</tr>' +
		'</table>' +
		'</td>' +
		'</tr>' +
		'</table>' +

		'</body>' +
		'</html>';

	var mailOptions = {
		from: 'chamados@dotsolucoes.com.br',
		to: req.session.email,
		subject: 'SCHREIBER FOODS E-MAIL DO CLIENTE  - Status: ABERTO',
		html: htmlBody
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response + 'to: ' + mailOptions.to);
		}
	});


	if (tickets.idSolicitation) {
		this._connection.query('insert into alerts set ? ', alert);

		this._connection.query('insert into tickets set ?', teste, function (err, result) {
			if (err) throw err;

			idsolicitacao = result.insertId;

			this._connection.query('update solicitations set status = 3, ticketSolicitation = ' + idsolicitacao + ' where idSolicitation = ' + tickets.idSolicitation);

			res.redirect('os-geral');


		});
	}
	else {
		this._connection.query('insert into alerts set ? ', alert);

		this._connection.query('insert into tickets set ? ', teste);
		this._connection.end();
		res.redirect('os-geral');



	}




}

TicketsDAO.prototype.getTicket = function (id, req, res) {

	this._connection.query('SELECT * FROM tickets t LEFT JOIN users u on t.id_user = u.id_user JOIN locations l on t.locationTicket = l.idLocation join machines m on t.id_machine = m.idMachine LEFT JOIN typeticket tt on t.typeTicket = tt.idTypeTicket where idTicket = ' + id.id + ';SELECT * FROM typeticket; SELECT * FROM typeticket tt left join tickets t on t.typeTicket = tt.idTypeTicket where t.idTicket = ' + id.id + '; select * from locations; select * from machines', [1, 2, 3, 4, 5], function (err, results) {
		if (err) throw err;

		res.render("admin/os_edit", { siteName: "CoreInd - Indústria 4.0", user: req.session.name, role: req.session.role, imgPath: req.session.path, ticket: results[0], typetickets: results[1], selectedticket: results[2], locations: results[3], machines: results[4], validacao: {} });
	});
	this._connection.end();


}

TicketsDAO.prototype.getTicketError = function (id, req, res, erros) {

	this._connection.query('SELECT * FROM tickets t LEFT JOIN users u on t.id_user = u.id_user JOIN locations l on t.locationTicket = l.idLocation join machines m on t.id_machine = m.idMachine LEFT JOIN typeticket tt on t.typeTicket = tt.idTypeTicket where idTicket = ' + id.id + ';SELECT * FROM typeticket; SELECT * FROM typeticket tt left join tickets t on t.typeTicket = tt.idTypeTicket where t.idTicket = ' + id.id + '; select * from locations; select * from machines', [1, 2, 3, 4, 5], function (err, results) {
		if (err) throw err;

		res.render("admin/os_edit", { siteName: "CoreInd - Indústria 4.0", user: req.session.name, role: req.session.role, imgPath: req.session.path, ticket: results[0], typetickets: results[1], selectedticket: results[2], locations: results[3], machines: results[4], validacao: erros });
	});
	this._connection.end();

}


TicketsDAO.prototype.getTicketDetails = function (id, req, res) {

	this._connection.query('SELECT * FROM tickets t LEFT JOIN users u on t.id_user = u.id_user JOIN locations l on t.locationTicket = l.idLocation join machines m on t.id_machine = m.idMachine LEFT JOIN typeticket tt on t.typeTicket = tt.idTypeTicket where idTicket = ' + id.id + '; SELECT * FROM interactions i join tickets t on i.ticketInteraction = t.idTicket join users u on t.id_user = u.id_user where ticketInteraction= ' + id.id + '', [1, 2], function (err, results) {
		if (err) throw err;
		res.render("admin/os_detail", { siteName: "CoreInd - Indústria 4.0", user: req.session.name, user_id: req.session.id_user, role: req.session.role, imgPath: req.session.path, ticket: results[0], interactions: results[1], validacao: {} });
	});
	this._connection.end();

}


TicketsDAO.prototype.getTicketsParam = function (req, res) {

	this._connection.query('SELECT * FROM locations; SELECT * FROM machines; SELECT * FROM typeticket', [1, 2, 3], function (err, results) {
		if (err) throw err;
		res.render("admin/os_open", { siteName: "CoreInd - Indústria 4.0", user: req.session.name, role: req.session.role, imgPath: req.session.path, locations: results[0], machines: results[1], typetickets: results[2], validacao: {}, ticketss: {} });
	});

	this._connection.end();

}

TicketsDAO.prototype.getTicketsDetailsParams = function (req, res, erros, ticket) {
	this._connection.query('SELECT * FROM locations; SELECT * FROM machines; SELECT * FROM typeticket', [1, 2, 3], function (err, results) {
		if (err) throw err;
		res.render("admin/os_open", { siteName: "CoreInd - Indústria 4.0", ticket: ticket, validacao: erros, user: req.session.name, role: req.session.role, imgPath: req.session.path, locations: results[0], machines: results[1], typetickets: results[2], ticketss: {} });
		return;
	});
	this._connection.end();

}


TicketsDAO.prototype.updateTicket = function (id, ticket, req, res, callback) {


	var value = {
		titleTicket: ticket.titleTicket,
		descriptionTicket: ticket.descriptionTicket,
		locationTicket: ticket.locationTicket,
		id_machine: ticket.id_machine,
		id_user: ticket.id_user,
		statusTicket: ticket.statusTicket,
		typeTicket: ticket.typeTicket,
		criticalityTicket: ticket.criticalityTicket
	}

	this._connection.query('UPDATE tickets set ? where idTicket = ' + id.id, value);
	res.redirect('os-detail?id=' + id.id);
	this._connection.end();


}

TicketsDAO.prototype.deleteTicket = function (id, callback) {

	this._connection.query('DELETE FROM tickets where idTicket = ' + id.id);
	this._connection.query('DELETE FROM interactions where ticketInteraction = ' + id.id, callback);
	this._connection.end();

}

TicketsDAO.prototype.deleteTicket2 = function (id, callback) {
	this._connection.query('DELETE FROM tickets where idTicket = ' + id);
	this._connection.query('DELETE FROM interactions where ticketInteraction = ' + id, callback);
	this._connection.end();
}



module.exports = function () {
	return TicketsDAO;
}