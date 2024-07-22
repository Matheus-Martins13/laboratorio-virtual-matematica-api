import {
  Body,
  Controller,
  // Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from './multer/multer-config';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @UseInterceptors(FileInterceptor('photo', multerConfig))
  create(@Body() user: UserDto, @UploadedFile() photo: Express.Multer.File) {
    return this.usersService.create(user, photo);
  }

  @UseGuards(AuthGuard)
  @Get('find-by-email/:username')
  async findByUserName(@Param() params: { email: string }) {
    return await this.usersService.findByEmail(params.email);
  }

  @Get('/find-all')
  findAll() {
    return this.usersService.findAll();
  }
  // @UseGuards(AuthGuard)
  // @Delete('/:id')
  // async remove(@Param('id') id: string) {
  //   return this.usersService.remove(id);
  // }
}
