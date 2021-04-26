import * as dotenv from 'dotenv';
dotenv.config();

import "reflect-metadata";
import {appConfig} from "./config/app";
import app from "./app";
import {createLogger} from "./helper/logger";
import {errorHandler, isExpectedError} from "./helper/error_handler";
import {createConnection} from "typeorm";
import initializeScheduler from "./scheduler";

const log = createLogger('bootstrap');

process.on('uncaughtException', async (error) => {
	await errorHandler(error);
	if (!isExpectedError(error)) {
		process.exit(1);
	}
});

process.on('unhandledRejection', (reason, p) => {
	throw reason;
});

export const validateEnv = () => {
	if(!appConfig.port) {
		throw new Error("port must be provided");
	}

	if(!appConfig.secret) {
		throw new Error("secret must be provided");
	}
};

export const initDatabase = async () => {
	if(!appConfig.enable_db) {
		return;
	}

	await createConnection();
	log.info('Database synchronized');
}

export const createServer = async () => {
	return app.listen({ port: appConfig.port }, () => {
		// tslint:disable:no-console
		log.info(`🚀 Server ready at http://localhost:${appConfig.port}`);
	});
};

export const initScheduler = () => {
	if(!appConfig.enable_scheduler) {
		return;
	}

	initializeScheduler();
}

export const bootstrap = async () => {
	validateEnv();

	await initDatabase();

	initScheduler();

	await createServer();
}
