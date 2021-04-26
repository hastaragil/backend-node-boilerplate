import {module} from '../decorator/module';
import {del, get, post, put} from '../decorator/route';
import {createLogger} from '../helper/logger';
import {appConfig} from "../config/app";
import {getCustomRepository} from "typeorm";
import {UserRepository} from "../repository/user";
import {User} from "../entity/User";

const log = createLogger('module', {
	module: 'user'
});

@module('/users')
export default class UserModule {
	@get('/', [])
	public async get(ctx) {
		const userRepository = getCustomRepository(UserRepository);

		const [rows, count] = await userRepository.findAndCount();
		ctx.body = {
			rows,
			count
		};
	}

	@post('/', [])
	public async post(ctx) {
		const userRepository = getCustomRepository(UserRepository);

		const user = new User();

		Object.assign(user, ctx.request.body);

		await userRepository.insert(user);

		ctx.body = {
			message: 'success'
		};
	}


	@put('/:id', [])
	public async put(ctx) {
		const userRepository = getCustomRepository(UserRepository);

		const user = await userRepository.findOne(ctx.params.id);
		Object.assign(user, ctx.request.body);

		await userRepository.save(user);

		ctx.body = {
			message: 'success'
		};
	}

	@del('/:id', [])
	public async del(ctx) {
		const userRepository = getCustomRepository(UserRepository);

		const user = await userRepository.findOne(ctx.params.id);

		await userRepository.delete(user);

		ctx.body = {
			message: 'success'
		};
	}
}
