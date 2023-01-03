import {Injectable} from '@nestjs/common';

@Injectable()
export class UserNameService {

    constructor() {}

    generateUsername(firstName: string, lastName: string): string {
        const init = firstName.slice(0, 5);
        return (init + lastName.slice(0, 1 + 5 - init.length)).toLowerCase();
    }
}
