const proxy = "http://192.168.1.90:3000";

// Funcion para obtener autentificar usuario
async function Login(username,password){
    
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    var json = JSON.stringify({
      "username": username,
      "password": password
    });
    var Options = {
      method: 'POST',
      headers: headers,
      body: json,
    };
    fetch(`${proxy}/login`, Options)
      .then(response => response.text())
      .then(result => {
            console.log(result)
            var json = JSON.parse(result);
            if(json["error"] != null){
                alert("Usuario o contraseña no validos !");
                return;
            }
            console.log(json);
            window.localStorage.setItem("token",json["accessToken"]);
            window.location.href = "./Player.html";
        }
      )
      .catch(error => {
        
        console.log('error', error);
      });
  }
  
