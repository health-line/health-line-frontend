FROM node:latest

WORKDIR /HackHPI/frontend

COPY ./frontend .
RUN npm install

EXPOSE 3000
CMD npm run serve