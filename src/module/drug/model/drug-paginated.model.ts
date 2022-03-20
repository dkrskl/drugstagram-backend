import { ObjectType } from '@nestjs/graphql';

import { Drug } from './drug.model';
import { Paginated } from '../../../common/pagination/pagination';

@ObjectType()
export class DrugPaginated extends Paginated(Drug) {}
