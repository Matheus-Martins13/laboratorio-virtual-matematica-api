import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubcategoryService {
  constructor(
    private prisma: PrismaService,
    private categoryService: CategoryService,
  ) {}

  async create(name: string, idCategory: string) {
    if (!name) {
      throw new BadRequestException(['O nome da subcategoria é obrigatório']);
    }
    if (!idCategory) {
      throw new BadRequestException(['A categoria pai é obrigatória']);
    }

    try {
      const subcategoryFound = await this.findByName(name);

      if (subcategoryFound) {
        throw new ConflictException([
          `A subcategoria '${name}' já está cadastrada`,
        ]);
      }

      const categoryFound = await this.categoryService.findById(idCategory);

      if (!categoryFound) {
        throw new BadRequestException([
          'Categoria pai não encontrada na base de dados',
        ]);
      }

      const subcategorySaved = this.prisma.subcategory.create({
        data: {
          name,
          idCategory,
        },
      });
      return subcategorySaved;
    } catch (err) {
      throw err;
    }
  }

  async findByName(name: string) {
    const subcategoryFound = await this.prisma.subcategory.findUnique({
      where: { name: name },
    });

    if (!subcategoryFound) return null;

    return subcategoryFound;
  }

  async findAll() {
    const categories = await this.prisma.subcategory.findMany();
    return categories;
  }

  async remove(idSubcategory: string) {
    if (!idSubcategory) {
      throw new BadRequestException(['O id da subcategoria é obrigatório']);
    }
    try {
      const subcategoryFound = await this.prisma.subcategory.findUnique({
        where: { idSubcategory },
      });

      if (!subcategoryFound) {
        throw new BadRequestException([
          `Nenhuma subcategoria encontrada com id ${idSubcategory}`,
        ]);
      }

      const subcategoryDeleted = await this.prisma.subcategory.delete({
        where: { idSubcategory },
      });

      return subcategoryDeleted;
    } catch (err) {
      throw err;
    }
  }
}
