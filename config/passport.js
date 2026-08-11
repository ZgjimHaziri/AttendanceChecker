'use strict';

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('../db');

module.exports = function configurePassport(passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const [rows] = await db.query(
        'SELECT id, email, name, lastName FROM users WHERE id = ? LIMIT 1',
        [id]
      );
      done(null, rows[0] || false);
    } catch (err) {
      done(err);
    }
  });

  passport.use(
    'local-login',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          const email = String(username || '').trim().toLowerCase();
          const [rows] = await db.query(
            'SELECT * FROM users WHERE email = ? LIMIT 1',
            [email]
          );

          if (!rows.length) {
            return done(null, false, req.flash('loginMessage', 'No user found'));
          }

          const user = rows[0];
          const ok = await bcrypt.compare(password, user.password);
          if (!ok) {
            return done(null, false, req.flash('loginMessage', 'Wrong password'));
          }

          return done(null, {
            id: user.id,
            email: user.email,
            name: user.name,
            lastName: user.lastName,
          });
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          const email = String(username || '').trim().toLowerCase();
          const name = String(req.body.name || '').trim();
          const lastName = String(req.body.lastName || '').trim();

          if (!email || !password || !name || !lastName) {
            return done(
              null,
              false,
              req.flash('signupMessage', 'All fields are required')
            );
          }

          const [existing] = await db.query(
            'SELECT id FROM users WHERE email = ? LIMIT 1',
            [email]
          );
          if (existing.length) {
            return done(
              null,
              false,
              req.flash('signupMessage', 'That email is already taken')
            );
          }

          const hash = await bcrypt.hash(password, 12);
          const [result] = await db.query(
            'INSERT INTO users (email, password, name, lastName) VALUES (?, ?, ?, ?)',
            [email, hash, name, lastName]
          );

          return done(null, {
            id: result.insertId,
            email,
            name,
            lastName,
          });
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
