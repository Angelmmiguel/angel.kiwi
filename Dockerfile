# Runtime
FROM bitnami/node:16.11.0-prod-debian-10-r2 as builder

# Code
COPY . /app

# Change workdir to app
WORKDIR /app

# Install deps
RUN npm install

# Build
RUN npm run build

# Base Image
FROM bitnami/nginx:1.21.3-debian-10-r33

# Copy the application
COPY --chown=1001 --from=builder /app/_site /app/
COPY deployment/kiwi.conf /opt/bitnami/nginx/conf/server_blocks/kiwi.conf
