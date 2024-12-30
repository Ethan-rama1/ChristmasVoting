# Get from mysql-server image
FROM mysql/mysql-server:latest

# Set environment variables root and user
ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_DATABASE=christmasvotingdb
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=s3cr3tb0x

# Copy SQL dump
COPY database_dump.sql /docker-entrypoint-initdb.d/

# Expose port 3306
EXPOSE 3306
