import { DynamicModule, Global, Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';

export declare class KafkaConfig {
  clientId?: string;
  brokers: string[];
  groupId: string;
}

@Global()
@Module({})
export class KafkaModule {
  static forRoot(kafkaConfig: KafkaConfig): DynamicModule {
    return {
      global: true,
      module: KafkaModule,
      providers: [
        {
          provide: KafkaService,
          useValue: new KafkaService(kafkaConfig),
        },
      ],
      exports: [KafkaService],
    };
  }
}
