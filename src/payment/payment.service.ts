import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Payment } from './payment.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { actions } from 'src/const/actions';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly userService: UserService,
    private dataSource: DataSource,
  ) {}

  public async debitFromAccount(paymentInfo): Promise<Payment[]> {
    const { user_id, amount, action } = paymentInfo;
    const user = await this.userService.getUser(user_id);

    return await this.dataSource.transaction(async () => {
      if (action === actions.payment && user.balance < amount) {
        throw new HttpException(
          'Insufficient funds in the account',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newPaymetn = this.paymentRepository.create({
        ...paymentInfo,
        ts: new Date(),
      });
      const result = await this.paymentRepository.save(newPaymetn);
      await this.userService.updateUserInfo(user_id, amount, action);
      return result;
    });
  }

  public async getUserHistory(user_id: number): Promise<Payment[]> {
    return this.paymentRepository.find({ where: { user_id } });
  }
}
