import { Inject, Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { TransactionDto } from '../dto/transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transactin.dto';

@Injectable()
export class UpdateTransactionUseCase {
	constructor(@Inject(TransactionRepository) private readonly updateTransactionRepository: TransactionRepository) {}

	public async updateTransaction(id: number, id_user: number, upateTransactionDto: UpdateTransactionDto): Promise<TransactionDto | null> {
		const existTransaction = await this.updateTransactionRepository.findOneById(id);
		if (!existTransaction) throw new NotFoundException('Transação não encontrada.');
		if (existTransaction.id_user != id_user) throw new ForbiddenException('Acesso negado: você não tem permissão para esta transação.');
		const updatedTransaction = { ...existTransaction, ...upateTransactionDto };
		await this.updateTransactionRepository.updateTransactionById(existTransaction.id, updatedTransaction);
		return await this.updateTransactionRepository.findOneById(existTransaction.id);
	}
}
