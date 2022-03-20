import { registerEnumType } from '@nestjs/graphql';

export enum OrderDirection {
	// Ascending order e.g: 0, 1, 2...
	asc = 'asc',
	// Descending order e.g: 2, 1, 0...
	desc = 'desc',
}

registerEnumType(OrderDirection, {
	name: 'OrderDirection',
	description: 'Possible directions for ordering items in the list.',
});
