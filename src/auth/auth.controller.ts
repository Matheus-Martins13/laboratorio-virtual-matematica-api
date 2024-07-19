import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthBodyDto, AuthResponseDto } from './auth.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async signIn(@Body() authBodyDto: AuthBodyDto): Promise<AuthResponseDto> {
    return await this.authService.signIn(
      authBodyDto.email,
      authBodyDto.password,
    );
  }
}
