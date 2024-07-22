import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { ObjectService } from './object/object.service';
import { ObjectModule } from './object/object.module';
import { CategoryModule } from './category/category.module';
import { SubcategoryModule } from './subcategory/subcategory.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    ObjectModule,
    CategoryModule,
    SubcategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, ObjectService],
})
export class AppModule {}
