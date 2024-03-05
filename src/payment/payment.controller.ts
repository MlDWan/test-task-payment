import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentInfo } from './dtos/paymentInfo.dto';
import { User } from 'src/user/user.entity';
import { Payment } from './payment.entity';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async createPayment(
    @Body()
    paymentInfo: PaymentInfo,
  ) {
    return this.paymentService.debitFromAccount(paymentInfo);
  }

  @Get()
  async getUser(@Query() { user_id }): Promise<Payment[]> {
    return this.paymentService.getUserHistory(user_id);
  }
}
