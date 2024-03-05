import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class PaymentInfo {
  @IsString()
  @IsNotEmpty()
  action: string;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
