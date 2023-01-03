import {Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {hash, verify} from "argon2";

@Injectable()
export class EncryptionService {

    constructor(private readonly config: ConfigService) {}

    async hash(plain: string): Promise<string> {
        return hash(plain, {
            hashLength: parseInt(process.env.PASSWORD_HASH_LENGTH) | 128,
            saltLength: parseInt(process.env.PASSWORD_SALT_LENGTH) | 64
        })
    }

    async verify(hash: string, plain: string): Promise<boolean> {
        return verify(hash, plain);
    }
}
