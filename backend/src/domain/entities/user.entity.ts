export class User {
	constructor(
		public readonly id: number | null,
		public name: string,
		public password: string,
		public createdAt: Date | null,
	) {}

	public static createUser(name: string, password: string): User {
		return new User(null, name, password, null);
	}
}
