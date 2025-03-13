import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, OneToMany } from 'typeorm';
import { CreateCategoryDto } from '../../application/dto/create-category.dto';
import { CategoryDto } from '../../application/dto/category.dto';
import { Transaction } from './transaction.entity';

@Entity('categories')
export class Category {
	@PrimaryGeneratedColumn()
	public id!: number;

	@Column()
	public name!: string;

	@Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	public created_at!: Date;

	@DeleteDateColumn({ type: 'timestamptz' })
	public delete_at!: Date;

	@Column()
	public id_user!: number;

	@OneToMany(() => Transaction, (transaction) => transaction.category)
	public transactions!: Transaction[];

	constructor(name?: string, id_user?: number) {
		this.name = name ?? '';
		this.id_user = id_user ?? 0;
	}

	public static createDtoToEntity(createCategoryDto: CreateCategoryDto): Category {
		return new Category(createCategoryDto.name, createCategoryDto.id_user);
	}

	public static entityToDto(category: Category): CategoryDto {
		return new CategoryDto(category.id, category.name, category.created_at, category.delete_at, category.id_user);
	}
}
