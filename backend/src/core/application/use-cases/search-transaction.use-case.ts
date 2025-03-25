import { Inject, Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { CategoryDto } from '../dto/category.dto';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { TransactionDto } from '../dto/transaction.dto';

@Injectable()
export class SearchTransactionUseCase {
	constructor(@Inject(TransactionRepository) private readonly transactionRepository: TransactionRepository) {}

	public async searchTransaction(id_user: number): Promise<TransactionDto[] | null> {
		const transactions = await this.transactionRepository.findByUserId(id_user);
		if (!transactions) throw new NotFoundException('Transação não encontrada.');
		return await this.transactionRepository.findByUserId(id_user);
	}

	public async searchTransactionById(id: number, id_user: number): Promise<null | TransactionDto> {
		const transaction = await this.transactionRepository.findOneById(id);
		if (!transaction) throw new NotFoundException('Transação não encontrada.');
		if (transaction.id_user != id_user) throw new ForbiddenException('Acesso negado: você não tem permissão para esta Transação.');
		return transaction;
	}

	public async getBalanceInvested(id_user: number): Promise<{ balance: number; invested: number }> {
		return await this.transactionRepository.getBalanceInvested(id_user);
	}
}
