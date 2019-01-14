import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import * as path from 'path';
import sassMiddleware from 'node-sass-middleware';

import errorHandler from 'errorhandler';
import { IndexRoute } from './routes';
import { SolveRoute } from './routes/solve';

export class Server {
    public app: express.Application;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    public config() {
        // add static paths
        this.app.use(express.static(path.join(__dirname, 'public')));

        // configure pug
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'ejs');

        // configure sass
        this.app.use(sassMiddleware({
            src: path.join(__dirname, 'public'),
            dest: path.join(__dirname, 'public'),
            indentedSyntax: false,
            sourceMap: true
        }));

        // mount logger
        this.app.use(logger('dev'));

        // mount json form parser
        this.app.use(bodyParser.json());

        // mount query string parser
        this.app.use(
            bodyParser.urlencoded({
                extended: true
            })
        );

        // mount cookie parser middleware
        this.app.use(cookieParser('SECRET_GOES_HERE'));

        // catch 404 and forward to error handler
        this.app.use(function(
            err: any,
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) {
            err.status = 404;
            next(err);
        });

        // error handling
        this.app.use(errorHandler());
    }

    private routes() {
        let router: express.Router;
        router = express.Router();

        IndexRoute.create(router);
        SolveRoute.create(router);

        this.app.use(router);
    }
}

// const indexRouter = require('./routes');
//   const solveRouter = require('./routes/solve');
//
// const server = express();
//
// // view engine setup
// server.set('views', path.join(__dirname, 'views'));
// server.set('view engine', 'ejs');
//
// server.use(logger('dev'));
// server.use(express.json());
// server.use(express.urlencoded({ extended: false }));
// server.use(cookieParser());
// server.use(sassMiddleware({
//   src: path.join(__dirname, 'public'),
//   dest: path.join(__dirname, 'public'),
//   indentedSyntax: false, // true = .sass and false = .scss
//   sourceMap: true
// }));
// server.use(express.static(path.join(__dirname, 'public')));
//
// server.use('/', indexRouter);
// server.use('/solve', solveRouter);
//
// // catch 404 and forward to error handler
// server.use(function(req, res, next) {
//   next(createError(404));
// });
//
// // error handler
// server.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//
// module.exports = server;
