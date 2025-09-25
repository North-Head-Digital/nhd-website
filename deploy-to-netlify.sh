#!/bin/bash

# North Head Digital - Netlify Deployment Script
echo "🚀 Deploying North Head Digital to Netlify..."

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Check if we're logged in to Netlify
if ! netlify status &> /dev/null; then
    echo "🔐 Please log in to Netlify:"
    netlify login
fi

# Deploy to Netlify
echo "📦 Deploying site..."
netlify deploy --prod --dir=public

echo "✅ Deployment complete!"
echo "🌐 Your site should be live at the URL shown above."
