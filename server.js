const express = require('express');
var session = require('express-session');
const server = express();
const http = require('http').Server(server);
const io = require('socket.io')(http);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');

server.use(express.static('views'));

const users = {};

const perdoruesit = ["Zgjim Haziri","Qendresa Bekaj","Loreta Shala","Vegim Shala","Behar Rexhepi","Erona Vrapcani","Arti Sadikaj","Rea Kasumi"];


var z = 0;
http.listen(3000, () => {
    console.log('Server started at: 3000');
});

/*server.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});*/

console.log(z);
io.on('connection', function (socket) {
    io.sockets.emit('user-joined', { clients:  Object.keys(io.sockets.clients().sockets), count: io.engine.clientsCount, joinedUserId: socket.id, joinedUsers: perdoruesit});
    console.log(users);
    socket.on('signaling', function(data) {
        io.to(data.toId).emit('signaling', { fromId: socket.id, ...data });
    });
    socket.on('disconnect', function() {
        io.sockets.emit('user-left', socket.id)
    });

    //prej chat-it
    socket.on('new-user', name => {
        users[socket.id] = perdoruesit[z];
        socket.broadcast.emit('user-connected', users[socket.id]);
        z++;
    });
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
    });
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id]
    });

    socket.on('micCamChange',(data) => {
        socket.broadcast.emit('mc-changes-return', { mic: data.mic, vid: data.vid, clients: Object.keys(io.sockets.clients().sockets)});
    });

    connection.query('SELECT * FROM users', function (error, results, fields) {
        if (error)
            throw error;

        socket.emit('sql_config', {res: results});

        results.forEach(result => {
        });
    });

});

/*const loogS = window.document.getElementById("login-submit");
console.log(loogS);*/

/*server.get('/loginhtml.html', function(req, res) {

    var name = 'hello';

    res.render(__dirname + "/views/loginhtml.html", {name:name});

});*/

var passport = require('passport');
var flash = require('connect-flash');

require('./config/passport')(passport);

server.use(morgan('dev'));
server.use(cookieParser());
server.use(bodyParser.urlencoded({
 extended: true
}));

server.set('view engine', 'ejs');

server.use(session({
 secret: 'justasecret',
 resave:true,
 saveUninitialized: true
}));

server.use(passport.initialize());
server.use(passport.session());
server.use(flash());

require('./app/routes.js')(server, passport);

//DATABAZA
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    database : 'pd',
    user     : 'root',
    password : ''
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
});