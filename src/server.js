"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = __importStar(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path = __importStar(require("path"));
const errorhandler_1 = __importDefault(require("errorhandler"));
const routes_1 = require("./routes");
class Server {
    static bootstrap() {
        return new Server();
    }
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        // add static paths
        this.app.use(express_1.default.static(path.join(__dirname, 'public')));
        // configure pug
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'pug');
        // mount logger
        this.app.use(morgan_1.default('dev'));
        // mount json form parser
        this.app.use(bodyParser.json());
        // mount query string parser
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        // mount cookie parser middleware
        this.app.use(cookie_parser_1.default('SECRET_GOES_HERE'));
        // catch 404 and forward to error handler
        this.app.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
        // error handling
        this.app.use(errorhandler_1.default());
    }
    routes() {
        let router;
        router = express_1.default.Router();
        routes_1.IndexRoute.create(router);
        this.app.use(router);
    }
}
exports.Server = Server;
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
//# sourceMappingURL=server.js.map