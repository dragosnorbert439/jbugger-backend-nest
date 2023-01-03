import {Node} from "neo4j-driver";
import {UserProperties} from "./user-properties";
import {GetUserDto} from "../dtos/get.user.dto";

export class User {

    constructor(private readonly node: Node) {}

    toJson(): UserProperties {
        return this.node.properties as UserProperties;
    }

    toGetUserDto(): GetUserDto {
        const { password, ...properties } = this.node.properties;
        return properties as GetUserDto;
    }


}