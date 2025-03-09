import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../core/domain/repositories/transaction.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../../core/domain/entities/transaction.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from '../../core/application/dto/create-transaction.dto';
import { TransactionDto } from '../../core/application/dto/transaction.dto';

@Injectable()
export class TransactionRepositoryOrm implements TransactionRepository {
	constructor(@InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>) {}

	public async createTransaction(createTransactionDto: CreateTransactionDto): Promise<TransactionDto> {
		const transactionEntity = new Transaction(
			createTransactionDto.id_user,
			createTransactionDto.id_category,
			createTransactionDto.description,
			createTransactionDto.value,
			createTransactionDto.type,

			createTransactionDto.date_transaction,
		);
		const savedTransaction = await this.transactionRepository.save(transactionEntity);
		return Transaction.entityToDto(savedTransaction);
	}
}
