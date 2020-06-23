module.exports.cadastro = function (application, req, res){
	res.render('autenticacao/cadastro', {validacao: {}, dadosForm: {}});
}

module.exports.cadastrar = function(application, req, res){

	var dadosForm = req.body;

	req.assert('user', 'Usuário não pode ser vazio').notEmpty();
	req.assert('password', 'Senha não pode ser vazio').notEmpty();
	req.assert('email', 'email não pode ser vazio').notEmpty();

	var erros = req.validationErrors();

	if(erros){
		res.render('autenticacao/cadastro', {validacao: erros, dadosForm: dadosForm});
		return;
	}


	var connection = application.config.dbConnection();
	var usuariosModel = new application.app.models.UsuariosDAO(connection);

	usuariosModel.inserirUsuario(dadosForm, function(error, result){
		res.redirect('/noticias');
	});    

}