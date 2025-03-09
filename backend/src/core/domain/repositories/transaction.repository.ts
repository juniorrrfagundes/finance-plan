import { CreateTransactionDto } from '../../application/dto/create-transaction.dto';
import { TransactionDto } from '../../application/dto/transaction.dto';

export abstract class TransactionRepository {
	public abstract createTransaction(createTransactionDto: CreateTransactionDto): Promise<TransactionDto>;
}
