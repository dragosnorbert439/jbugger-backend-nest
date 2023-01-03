export interface GetUserDto {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    hasLoggedIn: boolean;
    status: boolean;
    loginAttempts: number;
}