FROM adoptopenjdk/openjdk8:alpine

RUN apk add --no-cache bash

RUN wget https://github.com/ringo/ringojs/releases/download/v2.0.0/ringojs-2.0.0.tar.gz
RUN tar -xzf ringojs-2.0.0.tar.gz
ENV PATH="/ringojs-2.0.0/bin:${PATH}"

WORKDIR /code

COPY . .

EXPOSE 9005

CMD ["ringo", "app/main.js"]
