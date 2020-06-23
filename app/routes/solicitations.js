module.exports = function (application) {

	application.get('/solicitations', function (req, res) {
		application.app.controllers.solicitations.solicitations(application, req, res);
    });
    
	application.get('/api-solicitations', function (req, res) {
		application.app.controllers.solicitations.api_solicitations(application, req, res);
    });
    
	application.post('/solicitations-add', function (req, res) {
		application.app.controllers.solicitations.solicitations_add(application, req, res);
    });
    
	application.post('/solicitations-insert', function (req, res) {
		application.app.controllers.solicitations.solicitations_insert(application, req, res);
    });
    
	application.post('/solicitations-update', function (req, res) {
		application.app.controllers.solicitations.solicitations_update(application, req, res);
    });
    
	application.post('/solicitations-delete', function (req, res) {
		application.app.controllers.solicitations.solicitations_delete(application, req, res);
	});
}