import { Field, ObjectType, Int } from '@nestjs/graphql';

export function Paginated<TItem>(TItemClass: TItem): any {
	@ObjectType({ isAbstract: true })
	abstract class PaginatedType {
		@Field(() => [TItemClass])
		results: TItem[];

		@Field(() => Int)
		totalCount: number;
	}

	return PaginatedType;
}
