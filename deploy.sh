#!/bin/bash

echo "Starting deployment..."

cd /home/ubuntu/contact-app || exit

echo "Pulling latest code..."
git pull origin main

echo "Installing backend dependencies..."
cd backend
npm install

echo "Deploying frontend..."
cd ../frontend
sudo cp index.html /var/www/html/

echo "Restarting backend service..."
sudo systemctl restart contact-app

echo "Deployment completed successfully."
