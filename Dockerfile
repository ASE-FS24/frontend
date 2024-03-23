# Use an official Ubuntu image
FROM ubuntu:latest

RUN apt-get update && \
    apt-get install -y curl

# # Install nvm
# RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash

# # Source nvm in the shell session
# SHELL ["/bin/bash", "-c"]
# RUN source ~/.bashrc

# Update package lists and install necessary system dependencies
RUN apt-get update && \
    apt-get install -y \
        curl \
        nodejs \
        npm \
        python3 \
        python3-pip \
        groff \
        less \
        zip \
        iputils-ping

RUN apt install -y xdg-utils 

# Install AWS CLI using pip3
RUN pip3 install awscli
RUN pip3 install awscli-local

# Install LocalStack using pip3
RUN pip3 install localstack
# RUN pip3 install awslocal

# RUN nvm ls 

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY ./frontend/package.json ./

# Install TypeScript globally
RUN npm install -g typescript

# # Install LTS version of Node.js using nvm
# # RUN nvm install --lts
RUN ls 

# # Install Node.js dependencies
RUN npm install

# # Copy the rest of the application code
COPY ./frontend .

# # Build TypeScript files
RUN npm run build

# # Expose port 3000 (if your application requires it)
EXPOSE 3000

# # Command to run the application
CMD ["npm", "start"]
