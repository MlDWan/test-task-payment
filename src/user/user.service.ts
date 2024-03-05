import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { actions } from 'src/const/actions';
import { UserInfo } from './dtos/userInfo.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async createUser(userInfo: UserInfo): Promise<void> {
    const newUser = this.usersRepository.create({ ...userInfo });
    await this.usersRepository.save(newUser);
  }

  public async getUser(user_id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id: user_id });
  }

  public async getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  public async updateUserInfo(
    id: number,
    amount: number,
    action: string,
  ): Promise<void> {
    const userBalance = (await this.usersRepository.findOneBy({ id })).balance;

    await this.usersRepository.update(
      { id },
      {
        balance:
          action === actions.payment
            ? userBalance - amount
            : userBalance + amount,
      },
    );
  }
}
