export class CategoryDto {
	constructor(
		public id: number,
		public name: string | null,
		public create_at: Date | null,
		public delete_at: Date | null,
		public id_user: number,
	) {}
}
