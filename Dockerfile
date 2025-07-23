FROM node:22 AS backend-build
WORKDIR /opt/app

COPY package*.json ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./

RUN npm install

COPY . .

RUN npm run start:build

RUN npm cache clean --force 

RUN npm prune --omit=dev

RUN npm install pm2 -g

CMD [ "/bin/sh", "docker-entrypoint.sh" ]