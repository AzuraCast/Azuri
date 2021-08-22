FROM library/node:16-alpine

RUN apk update \
    && apk add bash python3 make g++

RUN mkdir -p /data/node_modules

COPY ./src /data

RUN chown -R node:node /data

COPY build_entrypoint.sh /
RUN chmod a+x /build_entrypoint.sh

# Define working directory.
WORKDIR /data

# Define working user.
USER node

VOLUME /data/node_modules
VOLUME /data/data/guilds.json

# Define default command.
ENTRYPOINT ["/build_entrypoint.sh"]
CMD ["npm", "run", "azuri"]
