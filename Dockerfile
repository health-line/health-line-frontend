FROM node:latest

WORKDIR /health-line-frontend

COPY . .
RUN npm install

EXPOSE 5000
CMD npm run deploy