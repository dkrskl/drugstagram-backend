import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { drugStub } from './stub/drug.stub';
import { DrugResolver } from '../drug.resolver';
import { DrugService } from '../drug.service';

const db = {
	drug: {
		findUnique: jest.fn().mockResolvedValue(drugStub()),
		findMany: jest
			.fn()
			.mockResolvedValue([drugStub(), drugStub(), drugStub()]),
		count: jest.fn().mockResolvedValue(3),
	},
};

describe('DrugModule', () => {
	let app: INestApplication;
	let resolver: DrugResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				DrugResolver,
				DrugService,
				{
					provide: PrismaService,
					useValue: db,
				},
			],
		}).compile();

		app = module.createNestApplication();
		resolver = module.get<DrugResolver>(DrugResolver);

		await app.init();
	});

	it('should be defined', () => {
		expect(app).toBeDefined();
	});

	it('should return a paginated drug list', async () => {
		const drugs = await resolver.drugs({ page: 1, resultsPerPage: 5 });

		expect(drugs.results).not.toEqual(0);
		expect(drugs.totalCount).not.toEqual(0);
	});
});
