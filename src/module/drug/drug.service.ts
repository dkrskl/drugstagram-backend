import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

import { PaginationArgs } from '../../common/pagination/pagination.args';
import { DrugOrder } from './dto/drug-order.input';

@Injectable()
export class DrugService {
	constructor(private prisma: PrismaService) {}

	async getPaginated(
		paginationArgs: PaginationArgs,
		search: string,
		orderBy: DrugOrder,
	) {
		const { page, resultsPerPage } = paginationArgs;
		const { field, direction } = orderBy ?? {};

		const where: Prisma.drugWhereInput = {};

		if (search) {
			const searchQuery: Prisma.StringNullableFilter = {
				contains: search,
				mode: 'insensitive',
			};

			where.OR = [
				{ name: searchQuery },
				{ disease: { some: { name: searchQuery } } },
			];
		}

		return {
			results: await this.prisma.drug.findMany({
				where,
				skip: (page - 1) * resultsPerPage,
				take: resultsPerPage,
				orderBy: { [field]: direction },
			}),
			totalCount: await this.prisma.drug.count({ where }),
		};
	}

	async getDiseases(id: number) {
		const { disease: diseases } = await this.prisma.drug.findUnique({
			where: { id },
			select: { disease: true },
		});

		const diseaseNames = diseases.map(({ name }) => name);

		return diseaseNames;
	}
}
