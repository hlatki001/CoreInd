module.exports = function (application) {

	//dashboard


	application.get('/dashboard', function (req, res) {
		application.app.controllers.admin.dashboard(application, req, res);
	});

	application.get('/user-rights', function (req, res) {
		application.app.controllers.admin.user_rights(application, req, res);
	});


	//os's

	application.get('/os-geral', function (req, res) {
		application.app.controllers.admin.os_geral(application, req, res);
	});

	application.get('/os-open', function (req, res) {
		application.app.controllers.admin.os_open(application, req, res);
	});

	application.post('/os-insert', function (req, res) {
		application.app.controllers.admin.os_insert(application, req, res);
	});

	application.get('/os-detail', function (req, res) {
		application.app.controllers.admin.os_detail(application, req, res);
	});

	application.get('/os-edit', function (req, res) {
		application.app.controllers.admin.os_edit(application, req, res);
	});

	application.post('/os-update', function (req, res) {
		application.app.controllers.admin.os_update(application, req, res);
	});

	application.get('/os-delete', function (req, res) {
		application.app.controllers.admin.os_delete(application, req, res);
	});

	//locations


	application.get('/locations-geral', function (req, res) {
		application.app.controllers.admin.locations_geral(application, req, res);
	});

	application.get('/locations-open', function (req, res) {
		application.app.controllers.admin.locations_open(application, req, res);
	});

	application.post('/locations-insert', function (req, res) {
		application.app.controllers.admin.locations_insert(application, req, res);
	});

	application.get('/locations-detail', function (req, res) {
		application.app.controllers.admin.locations_detail(application, req, res);
	});

	application.get('/locations-edit', function (req, res) {
		application.app.controllers.admin.locations_edit(application, req, res);
	});

	application.post('/locations-update', function (req, res) {
		application.app.controllers.admin.locations_update(application, req, res);
	});

	application.get('/locations-delete', function (req, res) {
		application.app.controllers.admin.locations_delete(application, req, res);
	});

	//users

	application.get('/profile', function (req, res) {
		application.app.controllers.user.profile_view(application, req, res);
	});

	application.post('/profile-update', function (req, res) {
		application.app.controllers.user.profile_update(application, req, res);
	});

	//typemachines

	application.get('/typemachines', function (req, res) {
		application.app.controllers.machines.type_machines(application, req, res);
	});

	application.post('/typemachine-insert', function (req, res) {
		application.app.controllers.machines.type_machines_insert(application, req, res);
	});

	application.post('/typemachine-update', function (req, res) {
		application.app.controllers.machines.type_machines_update(application, req, res);
	});

	application.post('/typemachine-delete', function (req, res) {
		application.app.controllers.machines.type_machines_delete(application, req, res);
	});



	//machines

	application.get('/machines', function (req, res) {
		application.app.controllers.machines.machines(application, req, res);
	});

	//machine details

	application.get('/machine-details', function (req, res) {
		application.app.controllers.machines.machine_details(application, req, res);
	});

	//machine edit

	application.get('/machine-edit', function (req, res) {
		application.app.controllers.machines.machines_edit(application, req, res);
	});

	application.post('/machine-update', function (req, res) {
		application.app.controllers.machines.machines_update(application, req, res);
	});

	//add machine

	application.get('/machine-add', function (req, res) {
		application.app.controllers.machines.machine_add(application, req, res);
	});

	//insert machine

	application.post('/machine-insert', function (req, res) {
		application.app.controllers.machines.machine_insert(application, req, res);
	});
	//delete machine

	application.post('/machine-delete', function (req, res) {
		application.app.controllers.machines.machine_delete(application, req, res);
	});

	//manuals

	application.get('/manuals', function (req, res) {
		application.app.controllers.manuals.getmanuals(application, req, res);
	});

	application.get('/manuals/:id', function (req, res) {
		application.app.controllers.manuals.getmanualsperid(application, req, res);
	});


	application.get('/manual-details', function (req, res) {
		application.app.controllers.manuals.manual_details(application, req, res);
	});


	var multer = require('multer');
	var path = require('path')

	var storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, 'app/public/uploads')
		},
		filename: function (req, file, cb) {
			cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
		}
	})

	var storageUser = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, 'app/public/uploads/users')
		},
		filename: function (req, file, cb) {
			cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
		}
	})


	var upload = multer({ storage: storage });

	application.post('/manual-insert', upload.array('multiple_images', 10), function (req, res) {
		application.app.controllers.manuals.manual_insert(application, req, res);

	});
	

	application.post('/manual-delete', function (req, res) {
		application.app.controllers.manuals.manual_delete(application, req, res);

	});

	var upload2 = multer({ storage: storageUser });

	application.post('/user-info-img', upload2.single('imgprofile'), function (req, res) {
		application.app.controllers.user.user_info_img(application, req, res);
	});

	var upload3 = multer({ storage: storageUser });

	application.post('/config-img', upload3.single('imgprofile'), function (req, res) {
		application.app.controllers.config.config_img(application, req, res);
	});

	//alerts

	application.get('/api-alerts', function (req, res) {
		application.app.controllers.alerts.alerts(application, req, res);
	});

	//alerts

	application.get('/alerts', function (req, res) {
		application.app.controllers.alerts.view_alerts(application, req, res);
	});

	application.post('/api-alerts', function (req, res) {
		application.app.controllers.alerts.alert(application, req, res);
	});

	application.post('/api-alerts-delete', function (req, res) {
		application.app.controllers.alerts.alert_delete(application, req, res);
	});



	//api's


	application.get('/tarefas-completadas/:id', function (req, res) {
		application.app.controllers.api.tickets(application, req, res);
	});
	application.get('/tarefas-graph/:id', function (req, res) {
		application.app.controllers.api.tickets_graph(application, req, res);
	});

	application.get('/tarefas-graph-mes/:id', function (req, res) {
		application.app.controllers.api.tickets_graph_mes(application, req, res);
	});

	application.get('/get-tickets', function (req, res) {
		application.app.controllers.api.get_tickets(application, req, res);
	});



	application.get('/user-info', function (req, res) {
		application.app.controllers.api.user_info(application, req, res);
	});

	application.post('/user-insert', function (req, res) {
		application.app.controllers.user.user_insert(application, req, res);
	});

	application.post('/user-update', function (req, res) {
		application.app.controllers.user.user_update(application, req, res);
	});

	application.post('/user-delete', function (req, res) {
		application.app.controllers.user.user_delete(application, req, res);
	});


	//all users

	application.get('/users', function (req, res) {
		application.app.controllers.api.users(application, req, res);
	});

	//single user by id

	application.get('/users/:id', function (req, res) {
		application.app.controllers.api.user(application, req, res);
	});

	//add user

	application.post('/users', function (req, res) {
		application.app.controllers.api.user_add(application, req, res);
	});

	//update user

	application.post('/user-update', function (req, res) {
		application.app.controllers.user.profile_update(application, req, res);
	});

	//delete user

	application.delete('/users/:id', function (req, res) {
		application.app.controllers.api.user_delete(application, req, res);
	});

	//get all machines

	application.get('/api-machines', function (req, res) {
		application.app.controllers.api.machines(application, req, res);
	});


	//get all locations

	application.get('/api-locations', function (req, res) {
		application.app.controllers.api.locations(application, req, res);
	});

	//get all typemachines

	application.get('/api-typemachines', function (req, res) {
		application.app.controllers.api.typemachines(application, req, res);
	});

	application.get('/api-manuals', function (req, res) {
		application.app.controllers.api.manuals(application, req, res);
	});

	application.get('/api-files/:id', function (req, res) {
		application.app.controllers.api.files(application, req, res);
	});




	application.post('/api-tm', function (req, res) {
		application.app.controllers.api.tm_add(application, req, res);
	});

	application.post('/api-lo', function (req, res) {
		application.app.controllers.api.lo_add(application, req, res);
	});

	application.get('/machine/:id', function (req, res) {
		application.app.controllers.api.machine_detail(application, req, res);
	});

	application.get('/api-manuals/:id', function (req, res) {
		application.app.controllers.api.machine_detail(application, req, res);
	});

	application.get('/api-users', function (req, res) {
		application.app.controllers.api.get_all_users(application, req, res);
	});



	application.post('/ticket-delete', function (req, res) {
		application.app.controllers.admin.ticket_delete(application, req, res);
	});

	application.get('/api-get-tickets', function (req, res) {
		application.app.controllers.api.api_get_tickets(application, req, res);
	});





}





