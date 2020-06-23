module.exports = function (application) {
    application.get('/calendar', function (req, res) {
        application.app.controllers.calendar.calendar(application, req, res);
    });

}