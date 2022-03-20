import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

import { AppModule } from './module/app/app.module';
import { CorsConfig, NestConfig } from './config/config.interface';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService);
	const corsConfig = configService.get<CorsConfig>('cors');
	const nestConfig = configService.get<NestConfig>('nest');

	// Catch unhandled exceptions
	const { httpAdapter } = app.get(HttpAdapterHost);
	app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

	// Cors
	if (corsConfig.enabled) {
		app.enableCors({
			credentials: true,
			origin: true,
		});
	}

	return app.listen(process.env.API_PORT || nestConfig.port || 7000);
}

bootstrap();
