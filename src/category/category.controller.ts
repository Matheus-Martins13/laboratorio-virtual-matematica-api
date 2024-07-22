import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body('name') name: string) {
    return this.categoryService.create(name);
  }

  @Get('/find-all')
  findAll() {
    console.log('aqui');
    return this.categoryService.findAll();
  }

  @Delete(':idCategory')
  remove(@Param('idCategory') idCategory: string) {
    return this.categoryService.remove(idCategory);
  }
}
