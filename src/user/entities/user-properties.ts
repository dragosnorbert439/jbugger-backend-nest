import {Unique} from "../../neo4j-data/decorators/unique.constraint.decorator";

export class UserProperties {

    firstName: string;

    lastName: string;

    phoneNumber: string;

    // @Unique()
    email: string;

    // @Unique()
    userName: string;

    password: string;

    hasLoggedIn: boolean;

    status: boolean;

    loginAttempts: number;

}