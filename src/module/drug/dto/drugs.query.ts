import { Field, InputType } from '@nestjs/graphql';

import { PaginationArgs } from '../../../common/pagination/pagination.args';
import { DrugOrder } from './drug-order.input';

@InputType()
export class DrugsQuery extends PaginationArgs {
	@Field({ nullable: true })
	search?: string;

	@Field(() => DrugOrder, {
		nullable: true,
	})
	orderBy?: DrugOrder;
}
