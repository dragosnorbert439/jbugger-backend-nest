import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {AuthenticationModule} from "./authentication/authentication.module";
import {UserModule} from "./user/user.module";
import {Neo4jModule} from "nest-neo4j/dist";
import {Neo4jDataModule} from './neo4j-data/neo4j-data.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        Neo4jModule.fromEnv(),
        AuthenticationModule,
        UserModule,
        Neo4jDataModule
    ],
    providers: [],
    controllers: []
})
export class AppModule {}
