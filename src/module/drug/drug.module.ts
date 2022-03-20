import { Module } from '@nestjs/common';

import { DrugResolver } from './drug.resolver';
import { DrugService } from './drug.service';

@Module({
	providers: [DrugResolver, DrugService],
})
export class DrugModule {}
