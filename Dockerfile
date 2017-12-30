FROM indiehosters/git AS version
WORKDIR /tmp/version
COPY .git .
RUN git rev-parse HEAD > VERSION \
 && git tag -l --points-at HEAD >> VERSION

FROM node:carbon-alpine as builder
WORKDIR /tmp/builder
COPY . .
RUN npm install \
 && npm run build

FROM node:carbon-alpine
WORKDIR /usr/local/seshat
COPY --from=version /tmp/version/VERSION .
COPY --from=builder /tmp/builder .
RUN mkdir uploads downloads blobs
ENTRYPOINT ["npm", "run"]
CMD ["start"]