export class AuthResponseDto {
  token: string;
  expiresIn: number;
}

export class AuthBodyDto {
  email: string;
  password: string;
}
