module.exports = function (application) {

	application.get('/type-general', function (req, res) {
		application.app.controllers.type.type_ticket_general(application, req, res);
	});

	application.post('/type-insert', function (req, res) {
		application.app.controllers.type.type_ticket_insert(application, req, res);
	});

	application.get('/type-edit', function (req, res) {
		application.app.controllers.type.type_ticket_edit(application, req, res);
	});


	application.get('/type-delete', function (req, res) {
		application.app.controllers.type.type_ticket_delete(application, req, res);
	});

	application.post('/type-update', function (req, res) {
		application.app.controllers.type.type_ticket_update(application, req, res);
	});


}