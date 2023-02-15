const proxy = "http://192.168.1.90:3000";

// Funcion para obtener autentificar usuario
async function Login(username, password) {

  var username = document.getElementById("username").value
  var password = document.getElementById("password").value
  var passwordC = document.getElementById("passwordC").value
  var email = document.getElementById("email").value


  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  var json = JSON.stringify({
    "username": username,
    "password": password,
    "passwordC": passwordC,
    "email": email,
  });
  var Options = {
    method: 'POST',
    headers: headers,
    body: json,
  };
  fetch(`${proxy}/registro`, Options)
    .then(response => response.text())
    .then(result => {
      console.log(result)
      var json = JSON.parse(result)
      if (json["error"] == null) {
        window.location.href = "./Login.html";
      } else {
        alert(json["mesagge"])
      }
    }
    )
    .catch(error => {
      console.log('error', error)
    });
}

