# Use the official PostgreSQL image from the Docker Hub
FROM postgres:16

# Add the init.sql script to the Docker image
COPY init.sql /docker-entrypoint-initdb.d/

# Set environment variables for PostgreSQL
ENV POSTGRES_DB=kafka-sandbox
ENV POSTGRES_USER=postgress
ENV POSTGRES_PASSWORD=postgress
