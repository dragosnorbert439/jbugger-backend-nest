import {CanActivate, ExecutionContext, forwardRef, Inject} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";

export class AuthGuard implements CanActivate {

    constructor(@Inject(forwardRef(() => JwtService))private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext) {

        const request = context.switchToHttp().getRequest();

        console.log(this.jwtService);

        return request.headers.authorization ?
            this.jwtService.verify(request.headers.authorization) : false;
    }
}