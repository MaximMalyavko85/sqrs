FROM node:alpine as development

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json ./

RUN npm install -g pnpm
#for root dependencies
RUN pnpm install

#COPY . .
COPY apps/notifications apps/notifications
COPY libs libs

#for local dependencies
RUN cd apps/notifications
RUN pnpm install

RUN pnpm run build notifications

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --prod

COPY --from=development /usr/src/apps/dist ./dist

CMD ["node", "dist/apps/notifications/main"]
