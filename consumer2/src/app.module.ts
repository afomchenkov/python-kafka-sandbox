import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';
import {
  AppService,
  PingIndicatorService,
  HealthService,
  KafkaConsumerService,
} from './services';
import { SettingModule } from './settings/settings.module';
import { KafkaModule } from './kafka';
import { SettingService } from './settings/settings.service';
import { DBModule } from './settings/db.module';
import { AppController } from './controllers/app.controller';
import { HealthController } from './controllers/health.controller';
import { HeadersMiddleware } from './common/headers.middleware';

const controllers = [AppController, HealthController];

const providers = [
  AppService,
  PingIndicatorService,
  HealthService,
  KafkaConsumerService,
];

const BROKER_1 = `${process.env.KAFKA_SERVER}:${process.env.KAFKA_PORT}`;
const CLIENT_ID = process.env.KAFKA_CLIENT_ID || 'nestjs-consumer-1';
const GROUP_ID = process.env.KAFKA_GROUP_ID || 'default-group';

const serviceConfig = {
  clientId: CLIENT_ID,
  brokers: [BROKER_1],
  groupId: GROUP_ID,
};

@Module({
  imports: [
    KafkaModule.forRoot(serviceConfig),
    CacheModule.register({
      isGlobal: true,
    }),
    TerminusModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    DBModule,
    TypeOrmModule.forRootAsync({
      imports: [SettingModule],
      inject: [SettingService],
      useFactory: (settingService: SettingService) => {
        return settingService.typeOrmUseFactory;
      },
    }),
  ],
  controllers,
  providers,
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HeadersMiddleware).forRoutes('*');
  }
}
