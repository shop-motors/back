import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { LoginDTO } from './dto/login.dto';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';

@ApiTags('login')
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('')
  @UseGuards(LocalAuthGuard)
  async login(@Body() user: LoginDTO) {
    return this.authService.login(user.email);
  }
}
