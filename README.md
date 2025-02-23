# Kafka Sandbox

## Python producter/consumer stack

- aiokafka
- Docker
- FastAPI
- Kafka-python
- Python 3.12

## Using docker compose

```bash
> docker-compose up --build
```

The configuration will create a cluster with the following containers:

- consumer1
- publisher
- kafka
- kafdrop
- zookeeper

The Publisher will create a simple RESTful API application that sends data to Kafka. It will take a few seconds to come up, then will be accessible at `http://localhost:8000`.

The Consumer1 is a script that aims to wait and receive messages from Kafka.

And the kafdrop container will provide acess to web UI for viewing Kafka topics and browsing consumer groups that can be accessed at `http://localhost:19000`.

## API

- Send Message
  
Send message to Kafka, below is an example request:

```json
POST http://localhost:8000/producer
Accept: application/json
Content-Type: application/json
Body:
{
    "name": "value",
    "description": "value",
}
```

- Health check
  
Checks if the app is available.

```json
GET http://localhost:8000/
Accept: application/json
Content-Type: application/json
```

## Swagger

The swagger, an automatic interactive API documentation, will be accessible at `http://localhost:8000/docs`

## Environment Variables

Listed below are the environment variables needed to run the application. They can be included in docker-compose or to run locally, it's necessary to create an `.env` file in the root of the Publisher and Consumer service folders.

- Publisher:

```bash
KAFKA_TOPIC_NAME=
KAFKA_SERVER=
KAFKA_PORT=
```

- Consumer1:

```bash
KAFKA_TOPIC_NAME=
KAFKA_SERVER=
KAFKA_PORT=
```

- Commands:

```bash
# List topics
docker exec -it kafka kafka-topics --bootstrap-server kafka:29092 --list
# Create topic
docker exec -it kafka kafka-topics --bootstrap-server kafka:29092 --create --topic topic_test --partitions 1 --replication-factor 1
# Describe consumer group
docker exec -it kafka kafka-consumer-groups --bootstrap-server kafka:29092 --group test-group --describe
# List consumer groups
docker exec -it kafka kafka-consumer-groups --bootstrap-server localhost:9092 --list
# Check if Kafka group coordinator is responsive
docker exec -it kafka kafka-consumer-groups --bootstrap-server kafka:29092 --list
# Check logs container Kafka
docker logs kafka --tail 50
# Check advertised listeners
docker-compose logs kafka | grep "advertised.listeners"
```

## Help and Resources

You can read more about the tools documentation:

- [aiokafka](https://aiokafka.readthedocs.io/en/stable/ka)
- [Docker](https://docs.docker.com/get-started/overview/)
- [FastAPI](https://fastapi.tiangolo.com)
- [Kafdrop](https://github.com/obsidiandynamics/kafdrop)
- [Kafka](https://kafka.apache.org)
- [Kafka-python](https://kafka-python.readthedocs.io/en/master/)
