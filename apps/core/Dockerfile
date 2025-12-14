FROM node:lts-alpine

COPY .next/standalone /
COPY .next/static /apps/websites/payloadcms/.next/static
COPY public /apps/websites/payloadcms/public

CMD ["node" ,"/apps/websites/payloadcms/server.js"]