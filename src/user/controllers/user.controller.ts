import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {UserService} from "../services/user.service";
import {CreateUserDto} from "../dtos/create.user.dto";
import {GetUserDto} from "../dtos/get.user.dto";
import {AuthGuard} from "../../authentication/guard/auth.guard";

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @UseGuards(AuthGuard)
    @Get()
    async findAll(): Promise<GetUserDto[]> {
        return (await this.userService.findAll()).map(user => user.toGetUserDto());
    }

    @Get('/usernames')
    async findAllUserNames(): Promise<string[]> {
        return await this.userService.findAllUserNames();
    }

    @Get('/user/:userName')
    async findByUserName(@Param('userName') userName: string): Promise<GetUserDto> {
        return (await this.userService.findByUserName(userName)).toGetUserDto();
    }

    @Post()
    async save(@Body() body: CreateUserDto): Promise<void> {
        await this.userService.save(body);
    }
}
