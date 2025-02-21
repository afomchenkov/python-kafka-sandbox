import logging
from json import loads
import six

from app.api.enum import EnvironmentVariables

from kafka import KafkaConsumer

class KafkaClient:
    def __init__(self):
        topic = EnvironmentVariables.KAFKA_TOPIC_NAME.get_env()
        host = EnvironmentVariables.KAFKA_SERVER.get_env()
        port = EnvironmentVariables.KAFKA_PORT.get_env()

        # To consume latest messages and auto-commit offsets
        self.consumer = KafkaConsumer(
            topic,
            bootstrap_servers=f"{host}:{port}",
            value_deserializer=lambda x: loads(x.decode("utf-8")),
            auto_offset_reset="earliest", # Start from the earliest message
            enable_auto_commit=True,
        )
    
    def consume_messages(self):
        try:
            for message in self.consumer:
                print(
                    "%s:%d:%d: key=%s value=%s"
                    % (
                        message.topic,
                        message.partition,
                        message.offset,
                        message.key,
                        message.value,
                    )
                )

        except Exception as e:
            logging.info("Connection error", e)
