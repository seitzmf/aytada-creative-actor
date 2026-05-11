# Use the official Node.js image
FROM apify/actor-node:20

# Copy only package files to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --include=dev && npm cache clean --force

# Copy the rest of the code
COPY . ./

# Build the project
RUN npm run build

# Set the start command
CMD ["npm", "start"]
