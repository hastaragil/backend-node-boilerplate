import {module} from '../decorator/module';
import {del, get, post, put} from '../decorator/route';
import {createLogger} from '../helper/logger';
import {appConfig} from "../config/app";

const log = createLogger('module', {
	module: 'root'
});

@module('/')
export default class RootModule {
    @get('/', [])
    public async get(ctx) {
		log.info('ini')
        ctx.body = {
            message: 'API is running',
            version: appConfig.version,
			name: appConfig.name
        };
    }
}
