FROM node:21-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ixlas-dashboard/package.json /app/package.json
RUN npm install --silent
COPY ixlas-dashboard /app
EXPOSE 3000

CMD ["npm", "start"]
