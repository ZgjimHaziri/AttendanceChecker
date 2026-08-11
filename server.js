'use strict';

require('dotenv').config();

const path = require('path');
const http = require('http');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const flash = require('connect-flash');
const passport = require('passport');
const { Server } = require('socket.io');

const db = require('./db');
const configurePassport = require('./config/passport');

const PORT = Number(process.env.PORT || 3000);
const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-only-insecure-secret';

if (!process.env.SESSION_SECRET) {
  console.warn(
    '[warn] SESSION_SECRET is not set — using an insecure default. Copy .env.example to .env.'
  );
}

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.APP_URL || `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

configurePassport(passport);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 8,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes')(app, passport);

const usersBySocket = new Map();

io.on('connection', (socket) => {
  socket.emit('user-joined', {
    clients: [...io.sockets.sockets.keys()],
    count: io.engine.clientsCount,
    joinedUserId: socket.id,
  });

  socket.on('new-user', (payload = {}) => {
    const displayName =
      typeof payload === 'string'
        ? payload
        : [payload.name, payload.lastName].filter(Boolean).join(' ').trim() ||
          payload.email ||
          'Guest';

    usersBySocket.set(socket.id, displayName);
    socket.broadcast.emit('user-connected', { id: socket.id, name: displayName });
  });

  socket.on('send-chat-message', (message) => {
    const name = usersBySocket.get(socket.id) || 'Guest';
    const text = String(message || '').slice(0, 2000);
    if (!text) {
      return;
    }
    socket.broadcast.emit('chat-message', { message: text, name, fromId: socket.id });
  });

  socket.on('add-presence', async () => {
    try {
      const present = [...usersBySocket.values()];
      io.emit('presence-number', { prezenca: present });
    } catch (err) {
      console.error('presence update failed', err);
    }
  });

  socket.on('signaling', (data = {}) => {
    if (!data.toId) {
      return;
    }
    io.to(data.toId).emit('signaling', { fromId: socket.id, ...data });
  });

  socket.on('micCamChange', (data = {}) => {
    socket.broadcast.emit('mc-changes-return', {
      mic: data.mic,
      vid: data.vid,
      fromId: socket.id,
      clients: [...io.sockets.sockets.keys()],
    });
  });

  socket.on('disconnect', () => {
    const name = usersBySocket.get(socket.id);
    usersBySocket.delete(socket.id);
    socket.broadcast.emit('user-left', socket.id);
    if (name) {
      socket.broadcast.emit('user-disconnected', { id: socket.id, name });
    }
    io.emit('presence-number', { prezenca: [...usersBySocket.values()] });
  });
});

async function start() {
  try {
    await db.query('SELECT 1');
    console.log('MySQL connection OK');
  } catch (err) {
    console.warn(
      '[warn] MySQL is not reachable yet — login/signup will fail until the DB is up:',
      err.message
    );
  }

  server.listen(PORT, () => {
    console.log(`Attendance Checker listening on http://localhost:${PORT}`);
  });
}

start();
