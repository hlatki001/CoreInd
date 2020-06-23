module.exports = function (application) {

    application.get('/criticality', function (req, res) {
        application.app.controllers.criticality.criticality(application, req, res);
    });

    application.get('/api-criticality', function (req, res) {
        application.app.controllers.criticality.api_criticality(application, req, res);
    });

    application.get('/criticality-add', function (req, res) {
        application.app.controllers.criticality.criticality_add(application, req, res);
    });

    application.post('/criticality-insert', function (req, res) {
        application.app.controllers.criticality.criticality_insert(application, req, res);
    });

    application.post('/criticality-delete', function (req, res) {
        application.app.controllers.criticality.criticality_delete(application, req, res);
    });

    application.post('/criticality-update', function (req, res) {
        application.app.controllers.criticality.criticality_update(application, req, res);
    });

    

}