# Dockerfile

# Copy the .env file
COPY .env .env

# Other steps (install dependencies, etc.)
RUN npm install
