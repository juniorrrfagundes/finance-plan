import { Inject, Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';

@Injectable()
export class DeleteTransactionUseCase {
	constructor(@Inject(TransactionRepository) private readonly deleteTransactionRepository: TransactionRepository) {}

	public async deleteTransaction(id: number, id_user: number): Promise<void> {
		const existTransaction = await this.deleteTransactionRepository.findOneById(id);
		if (!existTransaction) throw new NotFoundException('Transação não encontrada.');
		if (existTransaction.id_user != id_user) throw new ForbiddenException('Acesso negado: você não tem permissão para esta transação.');
		await this.deleteTransactionRepository.deleteTransactionById(existTransaction.id);
	}
}
