module.exports = function (application) {

    application.get('/reports', function (req, res) {
		application.app.controllers.reports.tickets(application, req, res);
	});


}