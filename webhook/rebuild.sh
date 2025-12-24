#!/bin/bash

cd /var/www/quebec-iptv.ca

echo "$(date): Starting rebuild..."

# Pull changes from GitHub
echo "Pulling changes from GitHub..."
git pull origin main

# Install dependencies if package.json changed
echo "Installing dependencies..."
npm install

# Build the Vite site
echo "Building Vite site..."
npm run build

# Set correct ownership
chown -R www-data:www-data /var/www/quebec-iptv.ca/dist

echo "$(date): Rebuild complete!"
