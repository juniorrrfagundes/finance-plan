import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';
import { CreateCategoryDto } from '../../application/dto/create-category.dto';
import { CategoryDto } from '../../application/dto/category.dto';

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

	constructor(name?: string, id_user?: number) {
		if (name && id_user) {
			this.name = name;
			this.id_user = id_user;
		}
	}

	public static createDtoToEntity(createCategoryDto: CreateCategoryDto): Category {
		return new Category(createCategoryDto.name, createCategoryDto.id_user);
	}

	public static entityToDto(category: Category): CategoryDto {
		return new CategoryDto(category.id, category.name, category.created_at, category.delete_at, category.id_user);
	}
}
