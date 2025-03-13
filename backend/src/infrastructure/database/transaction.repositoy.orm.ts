import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../core/domain/repositories/transaction.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../../core/domain/entities/transaction.entity';
import { DeleteResult, Repository, UpdateResult, IsNull } from 'typeorm';
import { CreateTransactionDto } from '../../core/application/dto/create-transaction.dto';
import { TransactionDto } from '../../core/application/dto/transaction.dto';
import { UpdateTransactionDto } from '../../core/application/dto/update-transactin.dto';

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

	public async deleteTransactionById(id: number): Promise<DeleteResult> {
		return this.transactionRepository.softDelete({ id: id });
	}

	public async findOneById(id: number): Promise<TransactionDto | null> {
		const transactions = await this.transactionRepository.findOneBy({ id: id });
		if (!transactions) return null;
		return Transaction.entityToDto(transactions);
	}

	public async updateTransactionById(id: number, upateTransactionDto: Partial<TransactionDto>): Promise<UpdateResult> {
		return this.transactionRepository.update(id, upateTransactionDto);
	}

	public async findByUserId(id: number): Promise<TransactionDto[] | null> {
		const transaction = await this.transactionRepository.find({ where: { id_user: id } });
		if (!transaction) return null;
		return transaction.map(Transaction.entityToDto);
	}

	public async getBalanceInvested(id: number): Promise<{ balance: number; invested: number }> {
		const transactions = await this.transactionRepository.find({
			where: { id_user: id, delete_at: IsNull() },
			relations: ['category'],
		});

		let balance = 0;
		let invested = 0;

		transactions.forEach((transaction) => {
			const isInvestment = transaction.category?.name === 'investiment';

			if (transaction.type === 'income') {
				if (isInvestment) {
					invested += Number(transaction.value);
				} else {
					balance += Number(transaction.value);
				}
			} else if (transaction.type === 'expense') {
				if (isInvestment) {
					invested -= Number(transaction.value);
				} else {
					balance -= Number(transaction.value);
				}
			}
		});

		return { balance: balance, invested: invested };
	}
}
