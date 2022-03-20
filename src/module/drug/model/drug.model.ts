import { Field, ObjectType } from '@nestjs/graphql';

import { BaseModel } from '../../../common/model/base.model';

@ObjectType()
export class Drug extends BaseModel {
	@Field()
	id: number;

	@Field(() => [String], {
		description: 'Diseases this drug is associated with.',
		nullable: true,
	})
	diseases: string[];

	@Field()
	description: string;

	@Field()
	name: string;

	@Field(() => Date, { description: 'Initial release date for the drug.' })
	released: Date;
}
