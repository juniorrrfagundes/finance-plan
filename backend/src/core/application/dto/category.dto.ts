export class CreateCategoryDto {
	constructor(public name: string, public id_user: number) {}
}

export class DeleteCategoryDto {
	constructor(public id: number, public id_user: number) {}
}
