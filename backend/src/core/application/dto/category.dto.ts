export class CategoryDto {
	constructor(private readonly id: number | null, public name: string, public create_at: Date | null, public delete_at: Date | null) {}
}
