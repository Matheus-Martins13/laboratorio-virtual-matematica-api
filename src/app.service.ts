import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Seja bem-vindo(a) ao Laboratório Virtual de Matemática!';
  }
}
