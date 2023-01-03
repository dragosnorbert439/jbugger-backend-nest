import {Body, Controller, Param, Post} from '@nestjs/common';
import {AuthenticationService} from "../services/authentication.service";

@Controller('auth')
export class AuthenticationController {

    constructor(private readonly authService: AuthenticationService) {}

    @Post('/login')
    async logIn(
        @Body('username') userName: string,
        @Body('password') plainPassword: string
    ): Promise<{ token: string }> {
        return {token: await this.authService.logIn(userName, plainPassword)};
    }
}
