import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { TransactionDto } from '../dto/transaction.dto';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';

@Injectable()
export class CreateTransactionUseCase {
	constructor(@Inject(TransactionRepository) private readonly transactionRepository: TransactionRepository) {}

	public async createTransaction(createTransactionDto: CreateTransactionDto, id_user: number): Promise<TransactionDto> {
		createTransactionDto.id_user = id_user;
		return await this.transactionRepository.createTransaction(createTransactionDto);
	}
}
