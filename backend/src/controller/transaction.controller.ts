import { Controller, Post, Body, Delete, UseGuards, Request, Param, Patch, ParseIntPipe, Inject } from '@nestjs/common';
import { JwtAuthGuard } from '../core/application/auth/jwt.auth.guard';
import { IRequest } from '../core/application/interface/request.interface';
import { CreateTransactionDto } from '../core/application/dto/create-transaction.dto';
import { CreateTransactionUseCase } from '../core/application/use-cases/create-transaction.use-case';
import { DeleteTransactionUseCase } from '../core/application/use-cases/delete-transaction.use-case';

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionController {
	constructor(private readonly createTransaction: CreateTransactionUseCase, private readonly deletetransaction: DeleteTransactionUseCase) {}

	@Post()
	public async create(@Body() createTransactionDto: CreateTransactionDto, @Request() req: IRequest) {
		const userId = req.user.id_user;
		return this.createTransaction.createTransaction(createTransactionDto, userId);
	}

	@Delete(':id')
	public async delete(@Param('id', ParseIntPipe) id: number, @Request() req: IRequest) {
		const userId = req.user.id_user;
		return this.deletetransaction.deleteTransaction(id, userId);
	}
}
