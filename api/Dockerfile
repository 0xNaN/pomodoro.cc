FROM alpine
RUN apk add --update nodejs make
RUN apk add --update python
ADD package.json /app/package.json
WORKDIR /app
RUN npm install
ADD . /app
CMD ["node", "index.js"]
