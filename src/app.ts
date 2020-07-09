import express, { Application } from 'express';
import morgan from 'morgan';
import exhbs from 'express-handlebars';
import path from 'path';
import passport from 'passport';
import flash from 'connect-flash';
import session from 'express-session';
const MySQLStore = require('express-mysql-session')(session)

//keys
import keys from './config/keys';

//import routes
import indexRoutes from './routes/index.routes';
import authRoutes from './routes/auth.routes';
import privateRoutes from './routes/private.routes';

//authentication
import './lib/auth';

export class App {

    app: Application

    constructor (private port?: string | number) {
        this.app = express();

        this.settings();
        this.middlewares();
        this.routes();
        this.statics();
        this.globalVariables();
    }

    settings() {
        this.app.set('port', process.env.PORT || this.port)
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.engine('.hbs', exhbs({
            defaultLayout: 'main',
            layoutsDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            extname: '.hbs'
        }));
        this.app.set('view engine', '.hbs');
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(session({
            secret: 'secretKey',
            resave: false,
            saveUninitialized: false,
            store: new MySQLStore(keys.DB)
        }))
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use(flash());
    }

    routes() {
        this.app.use(indexRoutes);
        this.app.use(authRoutes);
        this.app.use(privateRoutes);
    }

    globalVariables() {
        this.app.use((req, res, next) => {
            this.app.locals.danger = req.flash('message');
            this.app.locals.success = req.flash('success');
            this.app.locals.users = req.user;
            next();
        })
    }

    statics() {
        this.app.use(express.static(path.join(__dirname, 'public')));
    }

    async listen (): Promise <void> {
        await this.app.listen(this.app.get('port'))
        console.log('Server on port', this.app.get('port'));
    }

}