FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

# Remove cache and lock files for a clean install
RUN npm cache clean --force \
    && rm -rf package-lock.json node_modules

# Install dependencies
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
