module.exports = function (application) {
    application.post('/interactions-insert', function (req, res) {
       application.app.controllers.interaction.interaction_insert(application, req, res);
    });

    application.post('/interactions-update', function (req, res) {
        application.app.controllers.interaction.interactions_update(application, req, res);
    });

    application.get('/interactions-delete', function (req, res) {
		application.app.controllers.interaction.interactions_delete(application, req, res);
	});


}