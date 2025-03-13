import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateTransactionDto } from '../../application/dto/create-transaction.dto';
import { TransactionDto } from '../../application/dto/transaction.dto';
import { UpdateTransactionDto } from '../../application/dto/update-transactin.dto';

export abstract class TransactionRepository {
	public abstract createTransaction(createTransactionDto: CreateTransactionDto): Promise<TransactionDto>;

	public abstract deleteTransactionById(id: number): Promise<DeleteResult>;

	public abstract findOneById(id: number): Promise<TransactionDto | null>;

	public abstract updateTransactionById(id: number, upateTransactionDto: TransactionDto): Promise<UpdateResult>;

	public abstract findByUserId(id: number): Promise<TransactionDto[] | null>;

	public abstract getBalanceInvested(id: number): Promise<{ balance: number; invested: number }>;
}
