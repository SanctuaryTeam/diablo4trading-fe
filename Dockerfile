# Stage 1: Build stage with development dependencies
FROM node:latest AS development

# Set the working directory inside the container
WORKDIR /app

# Copy the rest
# COPY . .

ARG SANCTUARYTEAM_AUTH_TOKEN
ENV SANCTUARYTEAM_AUTH_TOKEN=${SANCTUARYTEAM_AUTH_TOKEN}

# Install development dependencies (including the full project)
# RUN yarn install

# Expose the development server port (if needed)
EXPOSE 5173

# Start the development server using Yarn (or your preferred command)
# CMD ["yarn", "dev"]
