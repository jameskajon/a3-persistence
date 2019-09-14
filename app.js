const express = require('express'),
    bodyParser = require('body-parser'),
    hbs = require('express-handlebars'),
    morgan = require('morgan');
const app = express();
const path = require('path');
const port = 3000;

const forumRouter = require('./routes/forum-rounter');
const authRouter = require('./routes/auth-routes');


// morgan logger
app.use(morgan('dev'));

// template engine setup (handlebars)
//app.engine('hbs', hbs({helpers: require("./public/js/helpers.js").helpers, extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// app.use(express.static(__dirname));
app.use(bodyParser.json());         // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: false
}));
app.use(express.static('public'));

app.use('/', forumRouter);
app.use('/auth', authRouter);


app.listen(port, () => console.log(`Listening on port ${port}`));