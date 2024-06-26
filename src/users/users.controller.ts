import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto, UserRouteParameters } from './user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  create(@Body() user: UserDto) {
    this.usersService.create(user);
  }

  @UseGuards(AuthGuard)
  @Get('/:username')
  async findByUserName(@Param() params: UserRouteParameters): Promise<UserDto> {
    return await this.usersService.findByUserName(params.username);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
