import {IsNotEmpty, IsString, Matches, MinLength} from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @Matches('^(49|40)?[0-9]{9}$')
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    @Matches('.*\\b@msg.group$')
    email: string;

}