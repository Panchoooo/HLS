Para ejecutar:
    # docker compose up
    
HLS Server:
    Crear archivo .env con las siguientes variables

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