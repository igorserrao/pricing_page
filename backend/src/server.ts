import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import 'reflect-metadata';
import { loggingHandler } from './middleware/loggingHandler';
import { corsHandler } from './middleware/corsHandler';
import { routeNotFound } from './middleware/routeNotFound';
import { mongo, server, SERVER_HOSTNAME, SERVER_PORT } from './config/config';
import { defineRoutes } from './modules/routes';
import MainController from './controllers/main';
import { declareHandler } from './middleware/declareHandler';
import PriceController from './controllers/price';

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = async () => {
    console.info('----------------------------------------');
    console.info('Initializing API...');
    console.info('----------------------------------------');
    application.use(express.urlencoded({ extended: true }));
    application.use(express.json());

    console.info('----------------------------------------');
    console.info('Connect to Mongo...');
    console.info('----------------------------------------');
    try {
        const connection = await mongoose.connect(
            mongo.MONGO_CONNECTION,
            mongo.MONGO_OPTIONS,
        );
        console.info('----------------------------------------');
        console.info('Connected to Mongo: ', connection.version);
        console.info('----------------------------------------');
    } catch (error) {
        console.info('----------------------------------------');
        console.info('Unable to connect to Mongo.');
        console.error(error);
        console.info('----------------------------------------');
    }

    console.info('----------------------------------------');
    console.info('Logging & Configuration...');
    console.info('----------------------------------------');
    application.use(declareHandler);
    application.use(loggingHandler);
    application.use(corsHandler);

    console.info('----------------------------------------');
    console.info('Routes...');
    console.info('----------------------------------------');
    defineRoutes([MainController, PriceController], application);

    console.info('----------------------------------------');
    console.info('Define Routing Error');
    console.info('----------------------------------------');
    application.use(routeNotFound);

    console.info('----------------------------------------');
    console.info('Starting server...');
    console.info('----------------------------------------');
    httpServer = http.createServer(application);
    httpServer.listen(server.SERVER_PORT, () => {
        console.info('----------------------------------------');
        console.info(
            `Server running at http://${SERVER_HOSTNAME}:${SERVER_PORT}/`,
        );
        console.info('----------------------------------------');
    });
};

export const Shutdown = (callback: any) =>
    httpServer && httpServer.close(callback);

Main();
