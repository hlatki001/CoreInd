module.exports.index = function (application, req, res) {

	res.render("home/login", { validacao: {}, avisos: {}, deslogado: {} });
}

module.exports.autenticar = function (application, req, res) {

	var dadosForm = req.body;
	req.assert('user', 'Usuário não pode ser vazio!').notEmpty();
	req.assert('password', 'Senha não pode ser vazia!').notEmpty();

	var erros = req.validationErrors();

	if (erros) {
		res.render("home/login", { validacao: erros });
		return;
	}


	var connection = application.config.dbConnection();
	var usuariosModel = new application.app.models.UsuariosDAO(connection);

	var usuario = dadosForm;


	usuariosModel.autenticaUsuario(dadosForm, req, res);

}

module.exports.sair = function (application, req, res) {

	req.session.destroy( function(err, result){

		res.render("home/login", { validacao: {}, avisos: {}, deslogado : "Deslogado com sucesso." });
	});

}