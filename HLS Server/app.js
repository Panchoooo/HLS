// Librerias
const mysql = require('mysql'); // BDD
const hls = require('hls-server'); // Libreria para HLS - Server
const fs = require('fs'); // Archivos
const express = require('express'); // Server
const delay = ms => new Promise(res => setTimeout(res, ms)); // Funcion auxiliar delay

// Librerias para autentificacion
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'somerandomaccesstoken';
const refreshTokenSecret = 'somerandomstringforrefreshtoken';

// Variables globales
const users = [
    {
        username: 'john',
        password: 'password123admin',
        role: 'admin'
    }, {
        username: 'anna',
        password: 'password123member',
        role: 'member'
    },
    {
        username: 'admin',
        password: '12341234',
        role: 'admin'
    }

]
let refreshTokens = [];
var segmentosLive = [0,1,2]; // Segmentos actuales -> migrar a bdd
var cantidadSegmentos = 63; // Cantidad de segmentos del live en uso -> Cambiar a bdd
var cantidad = 0; // Funcion auxiliar para saber el ultimo
var Live = "Conejo";
var PathLives = "./src/lives"; // Ruta de la direccion donde se almacenan todos los lives   

// Conexion a bdd
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password  :'',
    database : 'hls'
});

// Inicio servidor express
var app = express();
const server = app.listen(3000);    

// Configuracion del server
app.use(bodyParser.json());
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});



/* Autentificacion */
/*
    Errores:
        401: Credenciales invalidas
*/
app.post('/login', (req, res) => {
    // Obtiene informacion del usuario
    const { username, password } = req.body;

    var qry = `SELECT * FROM usuarios WHERE username='${username}' and password='${password}'`;
    connection.query(qry, function(error, results){
        if(results.length!=0){
            // En caso de ser valido se genera el token
            const accessToken = jwt.sign({ username: results[0].username, role: results[0].role }, accessTokenSecret, { expiresIn: '20m' });
            const refreshToken = jwt.sign({ username: results[0].username, role: results[0].role }, refreshTokenSecret);
            var error = null

            refreshTokens.push(refreshToken);

            res.json({
                accessToken,
                refreshToken,
                error
            });
        } else { // Caso contrario enviamos error
            error = 401
            res.json({
                error
            })
        }
    });
});

/* Nuevos usuarios */
/*
    Errores:
        1 : Contraseñas no coinciden
        2 : Usuario ya registrado
        3 : Error de conexion con bdd
*/
app.post('/registro', (req, res) => {
    const { username, password, passwordC } = req.body;

    error = null
    if(password != passwordC){ // COrroboramos que las contraseñas sea identicas
        mesagge = "Contraseñas no coindicen";
        error = 1;
        json = {error,mesagge}
        res.json(json);
        return
    }

    try {
        var qry = `SELECT * FROM usuarios WHERE username='${username}'`; // Revisamos si el usuario ya existe
        connection.query(qry, function(error, results){
            if(results.length!=0){
                mesagge = "Usuario ya registrado";
                error = 2;
                json = {error,mesagge}
                res.json(json); 
            }else{ // En caso de no existir, es agregado a la BDD
                var qry = `INSERT INTO usuarios (username,password) VALUES ('${username}','${password}')`;
                console.log(qry)
                connection.query(qry, function(error, results){
                    console.log("query response is ", results);
                    mesagge = "Usuario registrado exitosamente !";
                    json = {error,mesagge}
                    res.json(json);
                })
            }
            return
        })
    } catch (error) {
        mesagge = "Error el realizar la insercion";
        error = 3;
        json = {error,mesagge}
        res.json(json)
    }

  })

// Funcion para eliminar token
app.post('/logout', (req, res) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter(t => t !== token);
    res.send("Logout successful");
});

// Funcion para verificar token
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}







// Funciones HLS - Server 

// Solicitud para entrar al Player
app.get('/Live', (req, res) => {
    return res.status(200).sendFile(`${__dirname}/public/Player.html`);
});
// Solicitud para obtener el archivo .m3u8 del Live respectivo
app.get('/getLive',authenticateJWT, (req, res) => {
    return res.status(200).sendFile(`${__dirname}/src/lives/Conejo/live.m3u8`);
});
// Solicitud para obtener los fragmentos .ts del Live respectivo
app.get('/Conejo/:segmento', (req, res) => {
    var seg = req.params.segmento;
    console.log(seg)
    return res.status(200).sendFile(`${__dirname}/src/lives/Conejo/${seg}.ts`);
});
// Encargadas de solicitudes archivos .m3u8 y .ts
new hls(server, {
    provider: {
        exists: (req, cb) => {
            const ext = req.url.split('.').pop();
            if (ext !== 'm3u8' && ext !== 'ts') {
                return cb(null, true);
            }
            console.log(PathLives+req.url);
            fs.access(PathLives+req.url, fs.constants.F_OK, function (err) {
                if (err) {
                    console.log('File not exist');
                    return cb(null, false);
                }else{
                    
                    console.log('File  exist');
                }
                cb(null, true);
            });
        },
        getManifestStream: (req, cb) => {
            const stream = fs.createReadStream(PathLives + req.url  );
            cb(null, stream);
        },
        getSegmentStream: (req, cb) => {
            const stream = fs.createReadStream(PathLives + req.url  );
            cb(null, stream);
        }
    }
});









// Funcion encargada de editar el archivo del livestream
async function setLiveStream(){
    var Seg1 = segmentosLive[0];
    var Seg2 = segmentosLive[1];
    var Seg3 = segmentosLive[2];

    var file = `#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:10
#EXT-X-MEDIA-SEQUENCE:${cantidad}
#EXTINF:10.000000,
Conejo/segment${segmentosLive[0]}
#EXTINF:10.000000,
Conejo/segment${segmentosLive[1]}
#EXTINF:10.000000,
Conejo/segment${segmentosLive[2]}
`

    if(Seg1 == cantidadSegmentos){
        Seg1 = 0;
        Seg2 = 1;
        Seg3 = 2;
    }
    else if(Seg2 == cantidadSegmentos){
        Seg1 = cantidadSegmentos;
        Seg2 = 0;
        Seg3 = 1;
    }
    else if(Seg3 == cantidadSegmentos){
        Seg1 = cantidadSegmentos-1;
        Seg2 = cantidadSegmentos;
        Seg3 = 0;
    }
    else{
        Seg1 += 1;
        Seg2 += 1;
        Seg3 += 1;
    }

    segmentosLive = [Seg1,Seg2,Seg3];

    fs.writeFile(`${__dirname}/src/lives/${Live}/live.m3u8`, file, function(err) {
        if (err) {
          return console.log(err);
        }
      
    });

    cantidad+=1;

}

async function main(){
    while(true){
        await setLiveStream();
        await delay(10000)
    }
}

main()
