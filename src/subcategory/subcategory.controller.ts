import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';

@Controller('subcategory')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Post()
  create(
    @Body('subcategory') name: string,
    @Body('category') idCategory: string,
  ) {
    return this.subcategoryService.create(name, idCategory);
  }

  @Get('/find-all')
  findAll() {
    return this.subcategoryService.findAll();
  }

  @Delete(':idCategory')
  remove(@Param('idCategory') idCategory: string) {
    return this.subcategoryService.remove(idCategory);
  }
}
