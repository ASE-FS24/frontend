# Use an official Ubuntu image
FROM ubuntu:latest

RUN apt-get update && \
    apt-get install -y curl python3 python3-venv python3-dev

# Create a virtual environment and activate it
RUN python3 -m venv /venv
ENV PATH="/venv/bin:$PATH"

# Update package lists and install necessary system dependencies
RUN apt-get update && \
    apt-get install -y \
        nodejs \
        npm \
        groff \
        less \
        zip \
        iputils-ping

RUN apt install -y xdg-utils

# Install AWS CLI using pip in the virtual environment
RUN pip install awscli
RUN pip install awscli-local

# Install LocalStack using pip in the virtual environment
RUN pip install localstack

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY ./package.json ./

# Install TypeScript globally
RUN npm install -g typescript

RUN ls

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build TypeScript files
RUN npm run build

# Expose port 3000 (if your application requires it)
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]