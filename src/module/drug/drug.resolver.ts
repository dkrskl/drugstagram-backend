import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { Drug } from './model/drug.model';
import { DrugService } from './drug.service';
import { DrugPaginated } from './model/drug-paginated.model';
import { DrugsQuery } from './dto/drugs.query';

@Resolver(() => Drug)
export class DrugResolver {
	constructor(private drugService: DrugService) {}

	@Query(() => DrugPaginated)
	async drugs(@Args('query') drugsQuery: DrugsQuery) {
		const { page, resultsPerPage, search, orderBy } = drugsQuery;

		return this.drugService.getPaginated(
			{ page, resultsPerPage },
			search,
			orderBy,
		);
	}

	@ResolveField('diseases')
	async diseases(@Parent() drug: Drug) {
		const { id } = drug;

		return this.drugService.getDiseases(id);
	}
}
