import {Module} from '@nestjs/common';
import {AuthenticationService} from './services/authentication.service';
import {AuthenticationController} from './controllers/authentication.controller';
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AuthGuard} from "./guard/auth.guard";

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('SECRET'),
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [AuthenticationService, AuthGuard],
    exports: [AuthenticationService, AuthGuard],
    controllers: [AuthenticationController]
})
export class AuthenticationModule {
}
