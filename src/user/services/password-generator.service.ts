import {Injectable} from '@nestjs/common';

@Injectable()
export class PasswordGeneratorService {
    // noinspection SpellCheckingInspection
    private CHARACTERS = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    constructor() {}

    generateRandom(length: number = 10) {
        if (length < 8) length = 8;

        let password = "";
        for (let i = 0; i < length; ++i) {
            password += this.CHARACTERS.at(
                Math.floor(Math.random() * this.CHARACTERS.length)
            );
        }
        return password;
    }

    getStatic() {
        return 'msgNestDemo2022!ms';
    }
}
