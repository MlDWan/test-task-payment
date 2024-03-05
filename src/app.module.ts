import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { PaymentModule } from './payment/payment.module';
import { Payment } from './payment/payment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'leto',
      password: 'password',
      database: 'test-task',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
