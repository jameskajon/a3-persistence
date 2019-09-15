const express = require('express');
const authRouter = express.Router();

const firebaseAdmin = require("firebase-admin");

const auth = firebaseAdmin.auth();

authRouter.post('/sign-in', (req, res) => {
    const data = req.body;
    console.log(data);
    res.json({});
});

authRouter.post('/sign-up', async (req, res) => {
    const data = req.body;
    let respData = {};
    console.log(data);
    auth.createUser({
            email: data.email,
            emailVerified: false,
            // phoneNumber: '+11234567890',
            password: data.password,
            displayName: data.name,
            // photoURL: 'http://www.example.com/12345678/photo.png',
            disabled: false
        })
            .then(async function(userRecord) {
                // See the UserRecord reference doc for the contents of userRecord.
                console.log('Successfully created new user:', userRecord.uid);
                await storeSignInCookie(userRecord, res);
            })
            .catch(function(error) {
                console.log('Error creating new user:', error);
            });

});

async function storeSignInCookie(user, res) {
    await firebaseAdmin.auth().createCustomToken(user.uid)
        .then(async function(token) {
            // Set session expiration to 5 days.
            const expiresIn = 60 * 60 * 24 * 5 * 1000;
            // Create the session cookie. This will also verify the ID token in the process.
            // The session cookie will have the same claims as the ID token.
            // To only allow session cookie setting on recent sign-in, auth_time in ID token
            // can be checked to ensure user was recently signed in before creating a session cookie.
            await firebaseAdmin.auth().createSessionCookie(token, {expiresIn})
                .then((sessionCookie) => {
                    // Set cookie policy for session cookie.
                    const options = {maxAge: expiresIn, httpOnly: true, secure: true};
                    res.cookie('session', sessionCookie, options);
                    res.end(JSON.stringify({status: 'success'}));
                }, error => {
                    console.log(error);
                    res.status(401).send('UNAUTHORIZED REQUEST!');
                });

        })
        .catch(function(error) {
            console.log('Error creating custom token:', error);
        });
}

// auth sign out
authRouter.post('/sign-out', (req, res) => {

});

// auth with google
authRouter.get('/google', (req, res) => {
    // todo passport
    res.send('logging in with google');
});

module.exports = authRouter;
