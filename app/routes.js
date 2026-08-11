'use strict';

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/login');
}

module.exports = function registerRoutes(app, passport) {
  app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      return res.redirect('/table');
    }
    return res.redirect('/login');
  });

  app.get('/login', (req, res) => {
    res.render('login', {
      message: req.flash('loginMessage'),
      title: 'Attendance Checker — Login',
    });
  });

  app.post(
    '/login',
    passport.authenticate('local-login', {
      successRedirect: '/table',
      failureRedirect: '/login',
      failureFlash: true,
    })
  );

  app.get('/signup', (req, res) => {
    res.render('signup', {
      message: req.flash('signupMessage'),
      title: 'Attendance Checker — Sign up',
    });
  });

  app.post(
    '/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/table',
      failureRedirect: '/signup',
      failureFlash: true,
    })
  );

  app.get('/table', isLoggedIn, (req, res) => {
    res.render('table', {
      user: req.user,
      title: 'Orari',
    });
  });

  app.get('/room', isLoggedIn, (req, res) => {
    res.render('room', {
      user: req.user,
      appUrl: process.env.APP_URL || `http://localhost:${process.env.PORT || 3000}`,
      title: 'Classroom',
    });
  });

  app.get('/logout', (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.session.destroy(() => {
        res.redirect('/login');
      });
    });
  });
};
