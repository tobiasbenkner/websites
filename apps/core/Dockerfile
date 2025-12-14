FROM node:lts-alpine

COPY .next/standalone /
COPY .next/static /apps/core/.next/static
COPY public /apps/core/public

CMD ["node" ,"/apps/core/server.js"]