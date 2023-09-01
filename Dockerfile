FROM node:18.16.0-alpine
WORKDIR /opt/app
ADD package.json package.json 
RUN npm instal
ADD . .
RUN npm run build
RUN npm prune --production
CMD ["node", "./dist/main.js"]
