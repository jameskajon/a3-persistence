const express = require('express');
const authRouter = express.Router();


authRouter.get('/login', (req, res) => {
    res.render('login')
});

// auth logout
authRouter.get('logout', (req, res) => {
    // todo passport
    res.send('logging out');
});

// auth with google
authRouter.get('google', (req, res) => {
    // todo passport
    res.send('logging in with google');
});

module.exports = authRouter;
