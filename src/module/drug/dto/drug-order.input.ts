import { Field, InputType, registerEnumType } from '@nestjs/graphql';

import { Order } from '../../../common/order/order';

export enum DrugOrderField {
	id = 'id',
	name = 'name',
}

registerEnumType(DrugOrderField, {
	name: 'DrugOrderField',
	description: 'Properties by which drugs can be ordered.',
});

@InputType()
export class DrugOrder extends Order {
	@Field(() => DrugOrderField)
	field: DrugOrderField;
}
