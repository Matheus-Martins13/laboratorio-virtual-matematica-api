import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(name: string) {
    if (!name) {
      throw new BadRequestException(['O nome da categoria é obrigatório']);
    }
    try {
      const categoryFound = this.findByName(name);

      if (categoryFound) {
        throw new ConflictException([
          `A subcategoria ${name} já está cadastrada`,
        ]);
      }

      const categorySaved = this.prisma.category.create({
        data: {
          name,
        },
      });
      return categorySaved;
    } catch (err) {
      throw err;
    }
  }

  async findById(idCategory: string) {
    const categoryFound = await this.prisma.category.findUnique({
      where: { idCategory },
    });

    if (!categoryFound) return null;

    return categoryFound;
  }

  async findByName(name: string) {
    const categoryFound = await this.prisma.category.findUnique({
      where: { name: name },
    });

    if (!categoryFound) return null;

    return categoryFound;
  }

  async findAll() {
    const categories = await this.prisma.category.findMany();
    return categories;
  }

  async remove(idCategory: string) {
    if (!idCategory) {
      throw new BadRequestException(['O id da categoria é obrigatório']);
    }
    try {
      const categoryFound = await this.prisma.category.findUnique({
        where: { idCategory },
      });

      if (!categoryFound) {
        throw new BadRequestException([
          `Nenhuma categoria encontrada com id ${idCategory}`,
        ]);
      }

      const categoryDeleted = await this.prisma.category.delete({
        where: { idCategory },
      });

      return categoryDeleted;
    } catch (err) {
      throw err;
    }
  }
}
