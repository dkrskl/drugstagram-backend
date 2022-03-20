import { Config } from './config.interface';

export const config = (): Config => ({
	nest: {
		port: 7000,
	},
	cors: {
		enabled: true,
	},
});
