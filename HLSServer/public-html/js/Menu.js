const proxy = "http://192.168.1.90:3000";

function SelectLive(Live) {
  window.localStorage.setItem("live", Live);
  window.location.href = "./Player.html";
}

function Logout() {
  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", 'Bearer ' + window.localStorage.getItem("token"));

  window.localStorage.setItem("token", "");
  var Options = {
    method: 'POST',
    headers: headers
  };
  fetch(`${proxy}/logout`, Options)
    .then(response => response.text())
    .then(result => {
      console.log(result)
    }
    )
    .catch(error => {

      console.log('error', error);
    });

  window.location.href = "./Login.html";
}

// Funcion para obtener autentificar usuario
async function getLives() {

  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", 'Bearer ' + window.localStorage.getItem("token"));

  var Options = {
    method: 'GET',
    headers: headers
  };
  fetch(`${proxy}/getLives`, Options)
    .then(response => response.text())
    .then(result => {
      console.log(JSON.parse(result))
      var json = JSON.parse(result);
      if (json["error"] == null) {
        var lives = json["lives"];
        for (var i = 0; i < lives.length; i++) {
          console.log(lives[i])

          var descripcion = lives[i]["descripcion"]
          if (descripcion.length > 155) {
            descripcion = descripcion.slice(0, 150) + "..."
          }


          var inner = `
              <div class="live" onclick="SelectLive('${lives[i]["Nombre"]}')" >
                <img class="live-img" src="http://192.168.1.90:3000/portada/${lives[i]["Nombre"]}" >
                <div class="live-title">
                    <b class="live-name">${lives[i]["Nombre"]}</b><br><div class="live-description" style="">${descripcion}</div>
                </div>
              </div>
              `
          document.getElementById("lives").innerHTML += inner
        }
      }

    }
    )
    .catch(error => {

      console.log('error', error);
    });
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("nombre").innerHTML = window.localStorage.getItem("nombre")
  getLives();
}, false);