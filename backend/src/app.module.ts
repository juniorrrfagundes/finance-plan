// src/app.module.ts
import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
	imports: [UserModule, CategoryModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
