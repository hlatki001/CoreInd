var crypto = require('crypto');
var moment = require('moment');

function UsuariosDAO(connection) {
    this._connection = connection;
}

UsuariosDAO.prototype.inserirUsuario = function (usuario, req, res, callback) {


    var userDuplicado = 0;
    var emailDuplicado = 0;

    var senhaCripto = crypto.createHash("md5").update(usuario.password).digest("hex");

    usuario.password = senhaCripto;
    usuario.date = moment(usuario.date).format("DD/MM/YYYY HH:mm:ss");


    this._connection.query('SELECT * FROM users', function (error, results, fields) {

        for (let i = 0; i < results.length; i++) {
            console.log(results[i].user);
            if (results[i].user == usuario.user) {
                userDuplicado++
            }
        }
        if (userDuplicado > 0) {
            res.render('admin/user-rights', { erros: "Este usuário já existe!", user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0", validacao: {} });
        }
        else if (emailDuplicado > 0) {
            res.render('admin/user-rights', { erros: "Este email já está cadastrado!", user: req.session.name, role: req.session.role, userID: req.session.id_user, imgPath: req.session.path, siteName: "CoreInd - Indústria 4.0", validacao: {} });
        }
        else {
            this._connection.query('insert into users set ? ', usuario, callback);

        }
    });
    this._connection.end();


}

UsuariosDAO.prototype.atualizaUsuario = function (id, dadosForm, req, res, callback) {

    if (dadosForm.password == '') {
        console.log('senha vazia');
        var dados = {
            name: dadosForm.name,
            user: dadosForm.user,
            email: dadosForm.email,
            phone: dadosForm.phone,
            role: dadosForm.role
        };
    }
    else {
        var pwd = crypto.createHash("md5").update(dadosForm.password).digest("hex");
        var dados = {
            name: dadosForm.name,
            user: dadosForm.user,
            password: pwd,
            email: dadosForm.email,
            phone: dadosForm.phone,
            role: dadosForm.role
        };
    }


    this._connection.query('UPDATE users set ? where id_user = ' + id, dados, callback);
    this._connection.end();


}

UsuariosDAO.prototype.deletaUsuario = function (id, req, res, callback) {

    this._connection.query('DELETE from users where id_user = ' + id, callback);
    this._connection.end();


}



UsuariosDAO.prototype.autenticaUsuario = function (usuario, req, res) {



    var username = usuario.user;
    var password = crypto.createHash("md5").update(usuario.password).digest("hex");;
    var remember = usuario.remember;

    this._connection.query('SELECT * FROM users WHERE user = ? AND password = ?', [username, password], function (error, results, fields) {

        if (results[0] != undefined) {
            req.session.autorizado = true;
            req.session.id_user = results[0].id_user;
            req.session.user = results[0].user;
            req.session.email = results[0].email;
            req.session.name = results[0].name;
            req.session.date = results[0].date;
            req.session.phone = results[0].phone;
            req.session.caminho = results[0].path;
            req.session.role = results[0].role;

            if (results[0].path) {

                req.session.path = results[0].path;

            }
            else {
                req.session.path = "semavatar.jpg";

            }

            var moment = require('moment');

            if (remember) {
                var hour = 3600000
                req.session.cookie.expires = new Date(Date.now() + hour)
                req.session.cookie.maxAge = hour


            }
            else {
                var hour = 3600000;
                req.session.cookie.expires = new Date(Date.now() + hour)
                req.session.cookie.maxAge = hour
            }
            
            if (results[0].role == 3) {
                res.render("home/login", { validacao: {}, avisos: "Acesso não autorizado ao seu login, contacte o administrador.", deslogado: {} });
                return;

            }

            res.redirect("dashboard");
            return;
        }

        else {
            res.render("home/login", { validacao: {}, avisos: "Usuário ou senha incorretos!", deslogado: {} });
            return;

        }


    });
    this._connection.end();

}

UsuariosDAO.prototype.updateUser = function (user, id, req, callback) {

    var id = req.session.id_user;
    this._connection.query('UPDATE users set ? where id_user = ' + id, user, callback);
    this._connection.end();

}



UsuariosDAO.prototype.updateUserImage = function (img, id, actualPath, req, res) {

    this._connection.query('UPDATE users set path = "' + img.filename + '" where id_user = ' + id);
    this._connection.end();
    res.redirect("profile");


}


module.exports = function () {
    return UsuariosDAO;
}


