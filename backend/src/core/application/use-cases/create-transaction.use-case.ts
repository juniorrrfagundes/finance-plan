import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { TransactionDto } from '../dto/transaction.dto';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';

@Injectable()
export class CreateTransactionUseCase {
	constructor(@Inject(TransactionRepository) private readonly transactionRepository: TransactionRepository) {}

	public async createTransaction(createTransactionDto: CreateTransactionDto, id_user: number): Promise<TransactionDto> {
		return await this.transactionRepository.createTransaction(createTransactionDto, id_user);
	}
}
