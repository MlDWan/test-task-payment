import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class UserInfo {
    @IsString()
    @IsNotEmpty()
    firstName: string;
  
    @IsNumber()
    @IsNotEmpty()
    balance: number;
  }