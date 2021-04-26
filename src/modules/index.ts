import * as fs from 'fs';

export default function initializeModules(router) {
    const modules = (fs.readdirSync(__dirname))
		.filter((it) => !it.endsWith('.map') && !it.startsWith('index.'))
        .map((it) => it.replace('.ts', '').replace('.js', ''));

    modules.map((module) => {
        const moduleController = require(`${__dirname}/${module}`).default;
        const controller = new moduleController();

        router.use(controller.__routeName || '', controller.__router.routes(), controller.__router.allowedMethods());
    });
}
