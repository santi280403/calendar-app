import express, { Application } from 'express';
import morgan from 'morgan';
import exhbs from 'express-handlebars';
import path from 'path'

//import routes
import indexRoutes from './routes/index.routes';

export class App {

    app: Application

    constructor (private port?: string | number) {
        this.app = express();

        this.settings();
        this.middlewares();
        this.routes();
        this.statics();
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
    }

    routes() {
        this.app.use(indexRoutes)
    }

    statics() {
        this.app.use(express.static(path.join(__dirname, 'public')));
    }

    async listen (): Promise <void> {
        await this.app.listen(this.app.get('port'))
        console.log('Server on port', this.app.get('port'));
    }

}