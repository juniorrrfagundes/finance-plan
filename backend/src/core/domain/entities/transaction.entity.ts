import { Column, Entity, PrimaryGeneratedColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TransactionDto } from '../../application/dto/transaction.dto';
import { CreateTransactionDto } from '../../application/dto/create-transaction.dto';
import { Category } from './category.entity';

@Entity('transactions')
export class Transaction {
	@PrimaryGeneratedColumn()
	public id!: number;

	@Column()
	public id_user!: number;

	@Column()
	public id_category!: number;

	@Column()
	public description!: string;

	@Column()
	public value!: number;

	@Column()
	public type!: string;

	@Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	public created_at!: Date;

	@Column({ type: 'timestamptz' })
	public date_transaction!: Date;

	@DeleteDateColumn({ type: 'timestamptz' })
	public delete_at!: Date;

	@ManyToOne(() => Category, (category) => category.transactions, { nullable: true })
	@JoinColumn({ name: 'id_category' })
	public category!: Category;

	constructor(id_user: number, id_category: number, description: string, value: number, type: string, date_transaction: Date) {
		this.id_user = id_user;
		this.id_category = id_category;
		this.description = description;
		this.value = value;
		this.type = type;
		this.date_transaction = date_transaction;
	}

	public static createDtoToEntity(t: CreateTransactionDto): Transaction {
		return new Transaction(t.id_user, t.id_category, t.description, t.value, t.type, t.date_transaction);
	}

	public static entityToDto(transaction: Transaction): TransactionDto {
		return new TransactionDto(
			transaction.id,
			transaction.id_user,
			transaction.id_category,
			transaction.description,
			transaction.value,
			transaction.type,
			transaction.created_at,
			transaction.date_transaction,
			transaction.delete_at,
		);
	}
}
