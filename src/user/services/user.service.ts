import {Injectable} from '@nestjs/common';
import {User} from "../entities/user";
import {CreateUserDto} from "../dtos/create.user.dto";
import {UserNameService} from "./user-name.service";
import {EncryptionService} from "./encryption.service";
import {PasswordGeneratorService} from "./password-generator.service";
import {Neo4jService} from "nest-neo4j/dist";

@Injectable()
export class UserService {

    constructor(private readonly neo4jService: Neo4jService,
                private readonly userNameService: UserNameService,
                private readonly encryptionService: EncryptionService,
                private readonly passGeneratorService: PasswordGeneratorService) {}

    async findAll(): Promise<User[]> {
        const results = await this.neo4jService.read(`
            MATCH (u:User) return u
        `, {});

        return results.records.length > 0 ?
            results.records.map(it => new User(it.get('u'))) : [];
    }

    async findByUserName(userName: string): Promise<User> {

        const result = await this.neo4jService.read(`
            MATCH(u:User { userName: $userName })
            RETURN u LIMIT 1
            `, { userName }
        );
        if (!result.records.length) {
            /// TODO throw no entry exception with given userName
        }

        return new User(result.records[0].get('u'));
    }

    async findAllUserNames(): Promise<string[]> {
        return (
            await this.neo4jService
                .read('MATCH(u:User) RETURN u.userName AS userName', {})
        ).records.map(record => record.get('userName'));
    }

    async save(user: CreateUserDto): Promise<void> {
        await this.neo4jService
            .write(`
                CREATE(user:User)
                SET user += $properties
                `,{
                    properties: {
                        ...user,
                        userName: this.userNameService.generateUsername(
                            user.firstName,
                            user.lastName
                        ),
                        password: await this.encryptionService.hash(
                            this.passGeneratorService.getStatic()
                        ),
                        status: true,
                        hasLoggedIn: false,
                        loginAttempts: 0
                    }
                }
            );
    }

}
