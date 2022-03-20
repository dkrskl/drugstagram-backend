import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as path from 'path';

import { config } from '../../config/config';
import { DrugModule } from '../drug/drug.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, load: [config] }),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			sortSchema: true,
			autoSchemaFile: path.join(
				process.cwd(),
				'src/graph/schema.graphql',
			),
			debug: true,
			playground: true,
			context: ({ req }) => ({ req }),
			cors: false,
		}),
		PrismaModule.forRoot({
			isGlobal: true,
		}),
		DrugModule,
	],
})
export class AppModule {}
