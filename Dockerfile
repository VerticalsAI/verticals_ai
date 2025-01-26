# Use an official Node.js runtime as a base image
FROM node:20.10-alpine

RUN npm install -g pnpm

ENV PNPM_HOME=/app/.pnpm
ENV PATH=$PNPM_HOME:$PATH

# Set working directory
WORKDIR /usr/app

# Install PM2 globally
RUN pnpm install --global pm2

# Copy "package.json" and "package-lock.json" before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy all files
COPY ./ ./

# Build app
#RUN npm run build

# Expose the listening port
EXPOSE 3000

# Launch app with PM2
CMD [ "pm2-runtime", "start", "npm", "--", "run", "dev" ]