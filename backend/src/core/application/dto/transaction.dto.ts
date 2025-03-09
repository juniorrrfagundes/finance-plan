export class TransactionDto {
	constructor(
		public id: number,
		public id_user: number,
		public id_category: number,
		public description: string,
		public value: number,
		public type: string,
		public created_at: Date,
		public date_transaction: Date,
		public delete_at: Date,
	) {}
}
