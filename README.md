Para ejecutar:

    docker compose up
    
HLS Server:

    Crear archivo .env en carpeta HLSServer con los siguientes parametros

    # DATABASE
    DB_NAME=hls
    DB_USERNAME=root
    DB_PASSWORD=root
    DB_PORT=3306
    DB_HOST=hls-db


    # GENERAL
    SERVER_PORT=3000
    HLSPASSWORD=HLS
    PATH_LIVES=/src/lives

HLS Cliente:

    Login : http://localhost:8000/Login.html

    Registro : http://localhost:8000/Registro.html

    Menu : http://localhost:8000/Menu.html

    Player : http://localhost:8000/Player.html

    Usuarios Registrados:
        Usuario: Admin | Password 12341234
        Usuario: Francisco | Passowrd 12341234