
module.exports.profile_view = function (application, req, res, config) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {

        res.render("admin/profile", { user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0", validacao: {} });
    }
}

module.exports.profile_update = function (application, req, res, config) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        var user = req.body;
        var id = req.session.id_user;


        req.assert('name', 'Nome é obrigatório').notEmpty();
        req.assert('password', 'Senha é obrigatória').notEmpty()
        req.assert('email', 'Email é obrigatório').notEmpty()
        req.assert('phone', 'Telefone é obrigatório').notEmpty()

        var erros = req.validationErrors();

        if (erros) {

            res.render("admin/profile", { user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0", validacao: erros });

        }
        else {

            var connection = application.config.dbConnection();
            var userModel = new application.app.models.UsuariosDAO(connection);

            userModel.updateUser(user, id, req, function (error, result) {
                res.redirect("profile");
            });

        }
    }
}

module.exports.user_info_img = function (application, req, res, config) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {

        var idUser = req.body.idUser;
        var actualPath = req.body.actualPath;

        var img = req.file;

        console.log(img);
        console.log(idUser);


        var connection = application.config.dbConnection();
        var usuariosModel = new application.app.models.UsuariosDAO(connection);

        usuariosModel.updateUserImage(img, idUser, actualPath, req, res, function (error, result) { });
    }

}

module.exports.user_insert = function (application, req, res, config) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        var dadosForm = req.body;

        req.assert('user', 'Usuário não pode ser vazio').notEmpty();
        req.assert('password', 'Senha não pode ser vazio').notEmpty();
        req.assert('email', 'email não pode ser vazio').notEmpty();
    
        var erros = req.validationErrors();
    
        if(erros){
            res.render('admin/user-rights', { erros: {}, user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0", validacao: erros, dadosForm: dadosForm });
            return;
        }
    
    
        var connection = application.config.dbConnection();
        var usuariosModel = new application.app.models.UsuariosDAO(connection);
    
        usuariosModel.inserirUsuario(dadosForm, req, res, function(error, result){
            res.redirect('/user-rights');
        });  
    }
}

module.exports.user_update = function (application, req, res, config) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        var dadosForm = req.body;
        var id = dadosForm.id_user;

        console.log(dadosForm);

        req.assert('user', 'Usuário não pode ser vazio').notEmpty();
        req.assert('email', 'Email não pode ser vazio').notEmpty();
        req.assert('phone', 'Telefone não pode ser vazio').notEmpty();
        req.assert('role', 'Os direitos do usuário precisam ser selecionados!').notEmpty();
    
        var erros = req.validationErrors();
    
        if(erros){
            res.render('admin/user-rights', { erros: {}, user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0", validacao: erros, dadosForm: dadosForm });
            return;
        }
    
    
        var connection = application.config.dbConnection();
        var usuariosModel = new application.app.models.UsuariosDAO(connection);
    
        usuariosModel.atualizaUsuario(id, dadosForm, req, res, function(error, result){
            res.redirect('/user-rights');
        });  
    }
}

module.exports.user_delete = function (application, req, res, config) {
    if (req.session.autorizado != true) {
        res.redirect("/login");
        return;
    }
    else {
        var dadosForm = req.body;

        var id = dadosForm.id_user;
   
        var connection = application.config.dbConnection();
        var usuariosModel = new application.app.models.UsuariosDAO(connection);
    
        usuariosModel.deletaUsuario(id, req, res, function(error, result){
            res.redirect('/user-rights');
        });  
    }
}






