export class User {
	constructor(
		public readonly id: number,
		public name: string,
		public password: string,
		public createdAt: Date,
	) {}

	static create(name: string, password: string): User {
		return new User(Date.now(), name, password, new Date());
	}
}
