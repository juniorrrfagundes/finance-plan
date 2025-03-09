export class CreateTransactionDto {
	constructor(
		public id_user: number,
		public id_category: number,
		public description: string,
		public value: number,
		public type: string,
		public date_transaction: Date,
	) {}
}
