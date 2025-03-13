import { Controller, Post, Body, Delete, UseGuards, Request, Param, Patch, ParseIntPipe, Inject, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../core/application/auth/jwt.auth.guard';
import { IRequest } from '../core/application/interface/request.interface';
import { CreateTransactionDto } from '../core/application/dto/create-transaction.dto';
import { CreateTransactionUseCase } from '../core/application/use-cases/create-transaction.use-case';
import { DeleteTransactionUseCase } from '../core/application/use-cases/delete-transaction.use-case';
import { UpdateTransactionDto } from '../core/application/dto/update-transactin.dto';
import { UpdateTransactionUseCase } from '../core/application/use-cases/update-transaction.use-case';
import { SearchTransactionUseCase } from '../core/application/use-cases/search-transaction.use-case';

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionController {
	constructor(
		private readonly createTransaction: CreateTransactionUseCase,
		private readonly deletetransaction: DeleteTransactionUseCase,
		private readonly updateTransactionUseCase: UpdateTransactionUseCase,
		private readonly searchTransactionUseCase: SearchTransactionUseCase,
	) {}

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

	@Patch(':id')
	public async update(@Param('id', ParseIntPipe) id: number, @Request() req: IRequest, @Body() upateTransactionDto: UpdateTransactionDto) {
		const userId = req.user.id_user;
		return this.updateTransactionUseCase.updateTransaction(id, userId, upateTransactionDto);
	}

	@Get()
	public async searchAll(@Request() req: IRequest) {
		const userId = req.user.id_user;
		return this.searchTransactionUseCase.searchTransaction(userId);
	}

	@Get('/balance')
	public async getBalanceInvested(@Request() req: IRequest) {
		const userId = req.user.id_user;
		return this.searchTransactionUseCase.getBalanceInvested(userId);
	}

	@Get(':id')
	public async searchById(@Param('id', ParseIntPipe) id: number, @Request() req: IRequest) {
		const userId = req.user.id_user;
		return this.searchTransactionUseCase.searchTransactionById(id, userId);
	}
}
