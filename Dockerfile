# Use an official Node.js runtime as a base image
FROM node:18-alpine3.19 as development

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build TypeScript code
RUN npm run build

# Create the uploads folder
RUN mkdir -p uploads/orders

# Production Stage
FROM node:14-alpine3.14 as production

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy only the necessary files from the development stage
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/uploads ./uploads
COPY --from=development /usr/src/app/package*.json ./

# Expose the port the app runs on
EXPOSE 3001

# Define the command to run your application
CMD ["npm", "start"]



