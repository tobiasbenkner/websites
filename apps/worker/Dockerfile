FROM node:lts-alpine
WORKDIR /app

# Install ffmpeg
RUN apk add --no-cache ffmpeg

COPY dist/ .
CMD ["node", "worker.js"]