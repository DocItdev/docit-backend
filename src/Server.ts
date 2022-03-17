import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';

import initRoutes from './modules';
import logger from './shared/Logger';
import { sequelize } from './config';
import passport from './config/passport'
import cors from 'cors';

const app = express();
const { BAD_REQUEST } = StatusCodes;


app.use(cors( { origin: process.env.ORIGIN } ));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(passport.initialize())

if (process.env.NODE_ENV === 'development') {
    // Show routes called in console during development
    app.use(morgan('dev'));
    //Sync with database
    sequelize.sync({force: false, alter: true});
} 

if (process.env.NODE_ENV === 'production') {
    // Security
    app.use(helmet());
    //Sync with database
    sequelize.sync()
}

// Add Routes
initRoutes(app);

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.err(err, true);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});


// Export express instance
export default app;
