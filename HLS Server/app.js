// Proxy
const PORT = 3000;
const proxy = `http://192.168.1.90:${PORT}`;

// Librerias
const mysql = require('mysql'); // BDD
const hls = require('hls-server'); // Libreria para HLS - Server
const fs = require('fs'); // Archivos
const express = require('express'); // Server
const delay = ms => new Promise(res => setTimeout(res, ms)); // Funcion auxiliar delay

// Librerias para autentificacion
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'HLSServer';
const refreshTokenSecret = 'HLSServer';
let refreshTokens = [];

var PathLives = "./src/lives"; // Ruta de la direccion donde se almacenan todos los lives   

// Conexion a bdd
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hls'
});
// Funcion auxiliar para realizar Querys a BDD 
async function doqry(qry){
    try {
        return new Promise((resolve, reject)=>{
            connection.query(qry,  (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    } catch (error) {
        return "ERROR Doqry"
    }
}

// Inicio servidor express
var app = express();
const server = app.listen(PORT);

// Configuracion del server
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization,Access-Control-Allow-Origin");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});



/* Autentificacion */
/*
    Errores:
        401: Credenciales invalidas
        402: Error conexion
*/
app.post('/login', (req, res) => {
    try {
        // Obtiene informacion del usuario
        const { username, password } = req.body;

        var qry = `SELECT * FROM usuarios WHERE username='${username}' and password=AES_ENCRYPT('${password}','HLS')`;
        connection.query(qry, function (error, results) {
            if (results.length != 0) {
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
    } catch (error) {
        error = 402
        res.json({
            error
        })
    }

});

/* Nuevos usuarios */
/*
    Errores:
        1 : Contraseñas no coinciden
        2 : Usuario ya registrado
        3 : Error de conexion con bdd
*/
app.post('/registro', (req, res) => {
    const { username, password, passwordC, email } = req.body;

    error = null
    if (password != passwordC) { // COrroboramos que las contraseñas sea identicas
        mesagge = "Contraseñas no coindicen";
        error = 1;
        json = { error, mesagge }
        res.json(json);
        return
    }

    try {
        var qry = `SELECT * FROM usuarios WHERE username='${username}'`; // Revisamos si el usuario ya existe
        connection.query(qry, function (error, results) {
            if (results.length != 0) {
                mesagge = "Usuario ya registrado";
                error = 2;
                json = { error, mesagge }
                res.json(json);
            } else { // En caso de no existir, es agregado a la BDD
                var qry = `INSERT INTO usuarios (username,password,email) VALUES ('${username}',AES_ENCRYPT('${password}','HLS'),'${email}')`;
                connection.query(qry, function (error, results) {
                    mesagge = "Usuario registrado exitosamente !";
                    json = { error, mesagge }
                    res.json(json);
                })
            }
            return
        })
    } catch (error) {
        mesagge = "Error el realizar la insercion";
        error = 3;
        json = { error, mesagge }
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

// Solicitud para obtener el archivo .m3u8 del Live respectivo
// live (str) : Nombre live
app.get('/getLive/:live', authenticateJWT, (req, res) => {
    var live = req.params.live;
    return res.status(200).sendFile(`${__dirname}/src/lives/${live}/live.m3u8`);
});

// Solicitud para obtener los fragmentos .ts del Live respectivo
// live (str) : Nombre live
app.get('/portada/:live', (req, res) => {
    var live = req.params.live;
    console.log(live)
    return res.status(200).sendFile(`${__dirname}/src/lives/${live}/portada.png`);
});

// Solicitud para obtener los fragmentos .ts del Live respectivo
// segmento (str) : Nombre archivo segmento
app.get('/:live/:segmento', authenticateJWT, (req, res) => {
    var live = req.params.live;
    var seg = req.params.segmento;
    return res.status(200).sendFile(`${__dirname}/src/lives/${live}/${seg}.ts`);
});

// Encargadas de solicitudes archivos .m3u8 y .ts
new hls(server, {
    provider: {
        exists: (req, cb) => {
            const ext = req.url.split('.').pop();
            if (ext !== 'm3u8' && ext !== 'ts') {
                return cb(null, true);
            }
            //console.log(PathLives + req.url);
            fs.access(PathLives + req.url, fs.constants.F_OK, function (err) {
                if (err) {
                    //console.log('Archivo no existe');
                    return cb(null, false);
                } else {
                    //console.log('Archivo existe');
                }
                cb(null, true);
            });
        },
        getManifestStream: (req, cb) => {
            const stream = fs.createReadStream(PathLives + req.url);
            cb(null, stream);
        },
        getSegmentStream: (req, cb) => {
            const stream = fs.createReadStream(PathLives + req.url);
            cb(null, stream);
        }
    }
});

// Solicitud para obtener el archivo .m3u8 del Live respectivo
app.get('/getLives', authenticateJWT, (req, res) => {

    var qry = `SELECT Nombre,descripcion FROM lives where activo = 1 ORDER BY prioridad ASC`;
    connection.query(qry, function (error, results) {
        if (results.length != 0) {
            var lives = results;
            res.json({ lives });

        } else { // Caso contrario enviamos error
            error = 0;
            res.json({
                error
            })
        }
    });
});

// OBS
/*
// Solicitud para obtener el archivo .m3u8 del Live respectivo
app.get('/Obs/Obs', authenticateJWT, (req, res) => {
    return res.status(200).sendFile(`${__dirname}/src/lives/Obs/live.m3u8`);
});
*/



// Funcion que actualiza LIVE en particular
// Live (str) : Nombre live
async function ActualizarLive(Live){

    var parametros = await doqry("SELECT cantidad_fragmentos FROM parametros LIMIT 1");
    var cantidadALeer = parametros[0].cantidad_fragmentos;

    // Info Live General
    var id_live = Live.id;
    var nombreLive = Live.Nombre
    var cantidadFragmentos = Live.cantidad_fragmentos;
    var fragmentoActual = Live.fragmento_actual

    // Obtenemos fragmentos respectivos a leer
    /*var segmentos = await doqry(`SELECT segmento,duracion FROM lives_fragmentos WHERE id_live = ${Live.id} AND (numero = ${fragmentoActual%cantidadFragmentos} OR numero = ${(fragmentoActual%cantidadFragmentos)+1} OR numero = ${(fragmentoActual+2)%cantidadFragmentos} ) `)
    if(segmentos.length<3){
        console.log("No se encuentran los fragmentos solicitados")
        return -1;
    }*/
    // Template archivo m3u8
    var file = `#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:10
#EXT-X-MEDIA-SEQUENCE:${fragmentoActual}`;


    for(var s = 0  ; s < cantidadALeer ; s++){
        var segmentos = await doqry(`SELECT segmento,duracion FROM lives_fragmentos WHERE id_live = ${Live.id} AND (numero = ${(fragmentoActual+s)%cantidadFragmentos}  ) `)
        // Si algun segmento no se encuentra, error
        if(segmentos.length==0){
            console.log(`${nombreLive} | No se encuentran los fragmentos solicitados`)
            return -1;
        }

        file+=`
#EXTINF:${segmentos[0].duracion},
${proxy}/${nombreLive}/${segmentos[0].segmento}`
    }

    // Actualizar fragmento actual a leer
    if (fragmentoActual + cantidadALeer == cantidadFragmentos-1) {
        fragmentoActual = 0;
        await doqry(`UPDATE lives SET fragmento_actual = 0 WHERE id = ${id_live}`)
    }
    else {
        fragmentoActual += 1;
        await doqry(`UPDATE lives SET fragmento_actual = ${fragmentoActual} WHERE id = ${id_live}`)
    }

    // Actualizar el archivo m3u8 respectivo al live
    fs.writeFile(`${__dirname}/src/lives/${nombreLive}/live.m3u8`, file, function (err) {
        if (err) {
            return console.log(err);
        }

    });
    console.log(`Actualizado !`)


}

// Funcion encargada de actualizar lives Activos
async function LiveActivos() {
    var qry = `SELECT id,Nombre,cantidad_fragmentos,fragmento_actual FROM lives where activo = 1`;
    var lives = await  doqry(qry);
    for(var i = 0 ; i < lives.length ; i ++){ // Solicitamos actualizar cada live activo
        console.log(`Actualizando live : ${lives[i].Nombre}`);
        try {
            await ActualizarLive(lives[i]);
        } catch (error) {
            console.log(error)
            console.log(`Error actualizando live ${live[i].Nombre}`);
        }
        console.log("");
    }
}

// Funcion utilizada de manera global para la actualizacion de fragmentos y poder simular un Live
async function Actualizador() {
    while (true) {
        await delay(10000) // Actualizamos cada 10 segundos
        try {
            await LiveActivos();
        } catch (error) {
            console.log("Error actualizando lives !");            
        }
    }
}
Actualizador();


// Funcion utilizada de manera auxiliar para cargar Videos a BDD
// Live (str): Nombre del live
// Cheaders (int): Cantidad de lineas superiores a ignorar
async function cargarStream(Live,descripcion,Cheaders = 4){
    const buffer = fs.readFileSync(`./src/lives/${Live}/output.m3u8`);
    const fileContent = buffer.toString();
    filas = fileContent.split("\n")
    await doqry(`INSERT INTO lives (Nombre,descripcion,portada_path,cantidad_fragmentos,fragmento_actual,activo) VALUES ('${Live}','${descripcion}','./src/lives/${Live}/portada.png', ${(filas.length-1)/2-(Cheaders-1)},0 , 1)`)
    var id = await doqry("SELECT id FROM lives ORDER BY id DESC LIMIT 1 ")
    id = id[0].id;
    for(var i = Cheaders; i < filas.length-1 ; i+=2){
        var infoSeg = filas[i].replace(",","").replace("#EXTINF:","");
        var tSeg = infoSeg
        var nSeg = filas[i+1].replace(".ts","")
        await doqry(`INSERT INTO lives_fragmentos (id_live,segmento,duracion,numero) VALUES (${id},'${nSeg}','${tSeg}',${(i-Cheaders)/2})`)
    }
}

async function RegistrarLives(){
    await cargarStream("Conejo","El conejo que vive en un paraíso bucólico de bonitas praderas, árboles fruteros, pájaros y mariposas, es llevado al límite por la destrucción y crueldad de tres pequeños roedores.")
    await cargarStream("Malcom","Los Cleavers son una familia peculiar. La madre es una crontroladora radical que grita, el padre es un hombre chistoso calvo, el hijo mayor, Francis huyo de la familia a corta edad, Reese es un criminal, Dewey es un cadete espacial y el joven Jamie es un chivo expiatorio. ")
    await cargarStream("Sherk","Un ogro llamado Shrek vive en su pantano, pero su preciada soledad se ve súbitamente interrumpida por la invasión de los ruidosos personajes de los cuentos de hadas. Todos fueron expulsados de sus reinos por el malvado Lord Farquaad.")
    
}

//RegistrarLives()