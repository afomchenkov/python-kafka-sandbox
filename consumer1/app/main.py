import logging
import threading

from contextlib import asynccontextmanager
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.api import health
from app.api.kafka_client import KafkaClient


logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

app = FastAPI()

origins = ["http://localhost", "*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["DELETE", "GET", "POST", "PUT"],
    allow_headers=["*"],
)


@app.on_event("startup")
def start_consumer():
    """Run Kafka consumer in a separate thread when FastAPI starts"""
    logging.info("Kafka Listener started")

    kafka_client = KafkaClient()
    thread = threading.Thread(target=kafka_client.consume_messages, daemon=True)
    thread.start()


@app.get("/")
def read_root():
    return {"message": "Kafka Consumer is running!"}


@asynccontextmanager
async def init():
    try:
        print("Starting up...")

        yield
    finally:
        print("Shutting down...")


app.include_router(health.router)
