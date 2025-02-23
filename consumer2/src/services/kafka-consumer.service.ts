import { Injectable, Logger } from '@nestjs/common';
import {
  KafkaPayload,
  KafkaConsumer,
  SubscribeTo,
  SubscribeToFixedGroup,
} from '../kafka';

const TOPIC_1 = process.env.KAFKA_TOPIC_NAME;

@Injectable()
export class KafkaConsumerService extends KafkaConsumer {
  private logger = new Logger();

  constructor() {
    super();
  }

  protected registerTopic(): any {
    this.addTopic(TOPIC_1);
    this.addTopic('test-group');
  }

  @SubscribeTo(TOPIC_1)
  subscribe(payload: string): any {
    const data: KafkaPayload = JSON.parse(payload);

    this.logger.debug(data);
  }

  @SubscribeToFixedGroup('test-group')
  subscribeToFixedGroup(payload: KafkaPayload): any {

    this.logger.debug(payload);
  }
}
