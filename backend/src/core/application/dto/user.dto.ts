export class UserDto {
	constructor(
		public readonly id: number | null,
		public name: string,
		public create_at: Date | null,
	) {}
}
