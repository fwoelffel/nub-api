FROM indiehosters/git AS version
WORKDIR /tmp/version
COPY .git .
RUN git rev-parse HEAD > VERSION \
 && git tag -l --points-at HEAD >> VERSION

FROM node:carbon-alpine as dist
WORKDIR /tmp/
COPY package.json package-lock.json tsconfig.json ./
COPY src/ src/
RUN npm install
RUN npm run build

FROM node:carbon-alpine as node_modules
WORKDIR /tmp/
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm install

FROM node:carbon-alpine
WORKDIR /usr/local/nub-api
COPY --from=version /tmp/version/VERSION ./VERSION
COPY --from=node_modules /tmp/node_modules ./node_modules
COPY --from=dist /tmp/dist ./dist
COPY src ./src
CMD ["node", "dist/server.js"]