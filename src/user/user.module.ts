import {Module} from '@nestjs/common';
import {UserService} from './services/user.service';
import {UserController} from './controllers/user.controller';
import {UserNameService} from "./services/user-name.service";
import {EncryptionService} from "./services/encryption.service";
import {PasswordGeneratorService} from "./services/password-generator.service";
import {ConfigService} from "@nestjs/config";
import {Neo4jModule} from "nest-neo4j/dist";
import {Neo4jDataModule} from "../neo4j-data/neo4j-data.module";
import {AuthenticationModule} from "../authentication/authentication.module";

@Module({
    imports: [
        Neo4jModule,
        Neo4jDataModule,
        AuthenticationModule
    ],
    providers: [
        UserService,
        UserNameService,
        EncryptionService,
        PasswordGeneratorService,
        ConfigService
    ],
    exports: [UserService, EncryptionService],
    controllers: [UserController]
})
export class UserModule {
}
