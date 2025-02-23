import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';
import { HealthService } from './services/health.service';
import { AppService } from './services/app.service';
import { PingIndicatorService } from './services/ping.indicator.service';
import { SettingModule } from './settings/settings.module';
import { SettingService } from './settings/settings.service';
import { DBModule } from './settings/db.module';
import { AppController } from './controllers/app.controller';
import { HealthController } from './controllers/health.controller';
import { HeadersMiddleware } from './common/headers.middleware';

const controllers = [AppController, HealthController];

const providers = [AppService, PingIndicatorService, HealthService];

@Module({
  imports: [
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
