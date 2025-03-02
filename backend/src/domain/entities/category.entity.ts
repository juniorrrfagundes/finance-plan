export class Category {
	constructor(
		public readonly id: number | null,
		public name: string,
		public createdAt: Date | null,
		public delete_at: Date | null,
		public id_user: number,
	) {}

	public static createCategory(name: string, id_user: number): Category {
		return new Category(null, name, null, null, id_user);
	}
}
