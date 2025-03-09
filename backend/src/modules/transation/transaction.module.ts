import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '../../core/domain/entities/transaction.entity';
import { TransactionRepository } from '../../core/domain/repositories/transaction.repository';
import { TransactionRepositoryOrm } from '../../infrastructure/database/transaction.repositoy.orm';
import { CreateTransactionUseCase } from '../../core/application/use-cases/create-transaction.use-case';
import { TransactionController } from '../../controller/transaction.controller';
import { DeleteTransactionUseCase } from '../../core/application/use-cases/delete-transaction.use-case';

@Module({
	imports: [TypeOrmModule.forFeature([Transaction])],
	providers: [
		{
			provide: TransactionRepository,
			useClass: TransactionRepositoryOrm,
		},
		CreateTransactionUseCase,
		DeleteTransactionUseCase,
	],
	exports: [CreateTransactionUseCase],
	controllers: [TransactionController],
})
export class TransactionModule {}
