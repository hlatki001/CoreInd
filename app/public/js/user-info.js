var actualURL = window.location.host;

console.log(actualURL);

var loadAlerts = function () {
  var response = '';
  var result;
  var count = 0;
  $.ajax({
    url: 'http://' + actualURL + '/api-alerts',
    dataType: 'json',
    contentType: 'application/json; charset=UTF-8',
    type: 'GET',
    success: function (result) {
      if (result) {
        var response = result.results;
        for (let i = 0; i < response.length; i++) {
          if (response[i].statusAlert == 0) {
            count++;
          }
        }

        document.getElementById("AlertsCounter").innerHTML = count;
        if (response.length == 0) {
          result = '<div style="text-align: center; padding: 25px;">Sem nenhuma notificação!</div>';

        }

        $.each(response.slice(0,5), function (i, item) {

          if (item.statusAlert == 0) {
            var textW = "font-weight-bold";
          }
          else {
            var textW = "";
          }
          if (item.typeAlert == "Aviso") {

            var iconBG = "bg-primary";
            var iconICO = "fas fa-file-alt";
          }
          else if (item.typeAlert == "Alerta") {
            var iconBG = "bg-warning";
            var iconICO = "fas fa-exclamation-triangle";
          }

          if (item.statusAlert == 1) {
          }

          result += '<a class="dropdown-item d-flex align-items-center" href="alerts">' +
            '<div class="mr-3">' +
            '<div class="icon-circle ' + iconBG + '">' +
            '<i class="' + iconICO + ' text-white"></i>' +
            '</div>' +
            '</div>' +
            '<div>' +
            '<div class="small text-gray-500">' + item.dateAlert + '</div>' +
            '<span class="' + textW + '">' + item.titleAlert + '</span>' +
            '</div>' +
            '</a>';
        });
        $('#Alerts').html(result.replace("[object Object]", ''));
      }

    },
    error: function (erro) {
      console.log(erro);
    }
  });
};

var carrega_user = function () {
  var response = '';
  var result;
  var count = 0;
  $.ajax({
    url: 'http://' + actualURL + '/user-info',
    dataType: 'json',
    contentType: 'application/json; charset=UTF-8',
    type: 'GET',
    success: function (result) {
      if (result) {

        if(result.data[0].path == ""){

          document.getElementById("img-header").src = "uploads/users/semavatar.jpg";
          document.getElementById("img-profile").src = "uploads/users/semavatar.jpg";
          document.getElementById("img-profile-modal").src = "uploads/users/semavatar.jpg";
  

        }
        else{
          document.getElementById("img-header").src = "uploads/users/" + result.data[0].path;
          document.getElementById("img-profile").src = "uploads/users/" + result.data[0].path;
          document.getElementById("img-profile-modal").src = "uploads/users/" + result.data[0].path;
  

        }
        document.getElementById("user").value = result.data[0].user;
        document.getElementById("name").value = result.data[0].name;
        document.getElementById("email").value = result.data[0].email;
        document.getElementById("phone").value = result.data[0].phone;
      }

    },
    error: function (erro) {
      console.log(erro);
    }
  });
};

carrega_user();
loadAlerts();
