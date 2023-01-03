import {Injectable} from '@nestjs/common';
import {UserService} from "../../user/services/user.service";
import {JwtService} from "@nestjs/jwt";
import {EncryptionService} from "../../user/services/encryption.service";

@Injectable()
export class AuthenticationService {

    constructor(private readonly userService: UserService,
                private readonly jwtService: JwtService,
                private readonly encryptService: EncryptionService) {}

    async logIn(userName: string, plainPassword: string): Promise<string> {

        // check if user exists
        const user = (await this.userService.findByUserName(userName)).toJson();

        // verify credentials
        if (!await this.encryptService.verify(user.password, plainPassword)) {
            // TODO throw invalid credentials exception
            throw new Error('invalid credentials');
        }

        // return signed json web token
        return this.jwtService.signAsync({ sub: userName });
    }
}
