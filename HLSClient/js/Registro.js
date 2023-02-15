const proxy = "http://localhost:3000";

// Funcion para obtener autentificar usuario
async function Login(username, password) {

  var username = document.getElementById("username").value
  var password = document.getElementById("password").value
  var passwordC = document.getElementById("passwordC").value
  var email = document.getElementById("email").value

  if(password != passwordC){
    Swal.fire({
      title: 'Ha ocurrido un problema !',
      text: "Motivo: Contraseñas deben ser identicas",
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar'
    })
    return;
  }


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
        Swal.fire({
          title: 'Registrado !',
          text: "Se ha registrado exitosamente",
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "./Login.html";
          }
        })
      } else {
        Swal.fire({
          title: 'Ha ocurrido un problema !',
          text: "Motivo: "+json["mesagge"],
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        })

      }
    }
    )
    .catch(error => {
      console.log('error', error)
      Swal.fire({
        title: 'Ha ocurrido un problema !',
        text: "Motivo: " +error,
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      })
    });
}

