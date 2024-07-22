import { Module } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryController } from './subcategory.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryService } from 'src/category/category.service';
import { CategoryModule } from 'src/category/category.module';

@Module({
  providers: [SubcategoryService, PrismaService, CategoryService],
  controllers: [SubcategoryController],
  imports: [CategoryModule],
})
export class SubcategoryModule {}
