export class Category {
	constructor(
		public readonly id: number | null,
		public name: string | null,
		public created_at: Date | null,
		public delete_at: Date | null,
		public id_user: number | null,
	) {}

	public static createCategory(name: string, id_user: number): Category {
		return new Category(null, name, null, null, id_user);
	}

	public static deleteCategory(id: number, id_user: number): Category {
		return new Category(id, null, null, null, id_user);
	}
}
