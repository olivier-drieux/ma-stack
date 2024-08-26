# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=21.6.1
FROM node:${NODE_VERSION}-alpine as base

LABEL fly_launch_runtime="Next.js"

# Next.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apk update && \
    apk add build-base pkgconfig python3

# Install node modules
COPY --link package-lock.json package.json ./
RUN npm ci --include=dev

# Copy application code
COPY --link . .

# Build application
RUN --mount=type=secret,id=DATABASE_URL \
    --mount=type=secret,id=REDIS_URL \
    --mount=type=secret,id=WORDPRESS_API_URL \
    --mount=type=secret,id=WORDPRESS_USER \
    --mount=type=secret,id=WORDPRESS_PASSWORD \
    --mount=type=secret,id=OPENAI_API_KEY \
    DATABASE_URL="$(cat /run/secrets/DATABASE_URL)" \
    REDIS_URL="$(cat /run/secrets/REDIS_URL)" \
    WORDPRESS_API_URL="$(cat /run/secrets/WORDPRESS_API_URL)" \
    WORDPRESS_USER="$(cat /run/secrets/WORDPRESS_USER)" \
    WORDPRESS_PASSWORD="$(cat /run/secrets/WORDPRESS_PASSWORD)" \
    OPENAI_API_KEY="$(cat /run/secrets/OPENAI_API_KEY)" \
    npm run build

# Remove development dependencies
RUN npm prune --omit=dev


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app/.next/standalone /app
COPY --from=build /app/.next/static /app/.next/static
COPY --from=build /app/public /app/public

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "node", "server.js" ]
