import * as path from "path";

const packageJson = require(path.join(process.cwd(), 'package.json'));

interface IAppConfig {
	name: string,
	port: string|number,
	version: string|number,
	secret: string,
	upload_dir: string,
	enable_db: boolean,
	enable_graphql: boolean,
	enable_scheduler: boolean,
	validation_message?: {
		[name: string]: string
	},
}

export const appConfig: IAppConfig = {
    name: packageJson.name,
    version: packageJson.version,
    port: process.env.PORT,
    secret: process.env.SECRET,
	enable_db: (process.env.ENABLE_DB ?? 'yes') === 'yes',
	enable_graphql: (process.env.ENABLE_GRAPHQL ?? 'yes') === 'yes',
	enable_scheduler: (process.env.ENABLE_SCHEDULER ?? 'yes') === 'yes',
    upload_dir : process.env.UPLOAD_DIR ?? path.join(process.cwd(), 'uploads')
};
