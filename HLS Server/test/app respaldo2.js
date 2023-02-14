const mysql_connector = require('mysql');
var express = require('express');
var app = express();
const delay = ms => new Promise(res => setTimeout(res, ms));

const fs = require('fs');
const hls = require('hls-server');
var path = require('path');

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'somerandomaccesstoken';

var segmentosLive = [57,58,59];
var cantidadSegmentos = 63;
var Live = 1;
var cantidad = 0;

const connection = mysql_connector.createConnection({
    host : 'localhost',
    user : 'root',
    password  :'',
    database : 'hls'
  });

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

connection.connect();
connection.query("select * from user", function(error, results){
  console.log("query response is ", results);
})
connection.end();

const server = app.listen(3000);    
//app.use(bodyParser.json());
app.use(express.static('public'));
// Add headers before the routes are defined
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.get('/', (req, res) => {
    return res.status(200).sendFile(`${__dirname}/public/client.html`);
});

/*
// Funcion para obtener el archivo m3u8
app.get('/livestream', (req, res) => {
    return res.status(200).sendFile(`${__dirname}/src/videosf/livestream.m3u8`);
});


app.get('/livestream2', (req, res) => {
    var file = `#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:10
#EXT-X-MEDIA-SEQUENCE:${cantidad}
#EXTINF:10.000000,
videosf/segment${segmentosLive[0]}.ts
#EXTINF:10.000000,
videosf/segment${segmentosLive[1]}.ts
#EXTINF:10.000000,
videosf/segment${segmentosLive[2]}.ts
#EXT-X-ENDLIST
`
   // return res.status(200).send(file)
});

app.get('/videosf/:segmento', (req, res) => {
    console.log(req.url)
    var segmento = req.params.segmento;
 //   return res.status(200).sendFile(`${__dirname}/videosf/${segmento}`);
});
*/

new hls(server, {
    provider: {
        exists: (req, cb) => {
            const ext = req.url.split('.').pop();

            if (ext !== 'm3u8' && ext !== 'ts') {
                return cb(null, true);
            }

            fs.access(__dirname + req.url, fs.constants.F_OK, function (err) {
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
            const stream = fs.createReadStream(__dirname + req.url);
            cb(null, stream);
        },
        getSegmentStream: (req, cb) => {
            const stream = fs.createReadStream(__dirname + req.url);
            cb(null, stream);
        }
    }
});



async function setLiveStream(){
 
    var Seg1 = segmentosLive[0];
    var Seg2 = segmentosLive[1];
    var Seg3 = segmentosLive[2];

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
    cantidad+=1;

}

async function setLiveStream2(){
    var Seg1 = segmentosLive[0];
    var Seg2 = segmentosLive[1];
    var Seg3 = segmentosLive[2];

    var file = `#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:10
#EXT-X-MEDIA-SEQUENCE:${cantidad}
#EXTINF:10.000000,
segment${segmentosLive[0]}.ts
segment${segmentosLive[1]}.ts
segment${segmentosLive[2]}.ts
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

    fs.writeFile(__dirname + "/src/videosf/livestream.m3u8", file, function(err) {
        if (err) {
          return console.log(err);
        }
      
    });

    cantidad+=1;

}

async function main(){
    while(true){
        await setLiveStream2();
        await delay(10000)
    }
}

main()