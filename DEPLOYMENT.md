# 🚀 North Head Digital - Production Deployment Guide

This guide will walk you through deploying your complete NHD ecosystem to production using Netlify (website) and Railway (API).

## 📋 Prerequisites

- GitHub account with the NHD repositories
- Netlify account (free)
- Railway account (free)
- MongoDB Atlas account (already configured)

## 🌐 Step 1: Deploy Website to Netlify

### 1.1 Connect to Netlify

1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click **"New site from Git"**
3. Choose **"GitHub"** as your Git provider
4. Select **"North-Head-Digital/nhd-website"** repository
5. Click **"Deploy site"**

### 1.2 Configure Build Settings

Netlify will automatically detect the configuration from `netlify.toml`:

- **Base directory:** `.` (root)
- **Publish directory:** `public`
- **Build command:** `echo 'Static site - no build required'`

### 1.3 Custom Domain (Optional)

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `northheaddigital.com`)
4. Follow DNS configuration instructions

### 1.4 Get Your Netlify URL

After deployment, you'll get a URL like: `https://northheaddigital.netlify.app`

## 🔧 Step 2: Deploy API to Railway

### 2.1 Connect to Railway

1. Go to [railway.app](https://railway.app) and sign up/login
2. Click **"New Project"**
3. Choose **"Deploy from GitHub repo"**
4. Select **"North-Head-Digital/nhd-api"** repository
5. Railway will automatically detect it's a Node.js project

### 2.2 Configure Environment Variables

Go to your project → **Variables** tab and add:

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://ADMIN:Password123@nhd-portal.6o9g1b7.mongodb.net/nhd-portal?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=https://your-netlify-site.netlify.app
```

**⚠️ Important:** Replace `JWT_SECRET` with a strong, unique secret!

### 2.3 Deploy

Railway will automatically build and deploy your API. You'll get a URL like: `https://nhd-api-production.up.railway.app`

## 🔗 Step 3: Connect Website to API

### 3.1 Update Client Portal Environment

1. Go to your Netlify site settings
2. Go to **Environment variables**
3. Add these variables:

```env
VITE_API_BASE_URL=https://your-railway-api.up.railway.app
VITE_ENV=production
```

### 3.2 Rebuild Client Portal

1. In your local development environment:
2. Update the client portal environment:
   ```bash
   cd NHD-Client_Portal
   echo "VITE_API_BASE_URL=https://your-railway-api.up.railway.app" > .env.production
   echo "VITE_ENV=production" >> .env.production
   ```

3. Build the portal for production:
   ```bash
   npm run build
   ```

4. Copy the build to the website:
   ```bash
   cp -r dist/* ../NHD-Website/public/portal/app/
   ```

5. Commit and push to GitHub:
   ```bash
   cd ../NHD-Website
   git add .
   git commit -m "Update client portal with production API URL"
   git push
   ```

### 3.3 Trigger Netlify Redeploy

Netlify will automatically redeploy when you push to GitHub.

## 🧪 Step 4: Test Production Deployment

### 4.1 Test API

```bash
curl https://your-railway-api.up.railway.app/api/health
```

Expected response:
```json
{"status":"OK","message":"NHD Portal API is running","timestamp":"..."}
```

### 4.2 Test Website

1. Visit your Netlify URL
2. Navigate to `/portal.html`
3. Try logging in with test credentials:
   - **Client:** `sarah@boldcoffee.com` / `password123`
   - **Client:** `jack@jacksretail.com` / `password123`

### 4.3 Test Client Portal

1. Login through the portal
2. Verify all features work:
   - Dashboard loads
   - Navigation works
   - API calls succeed
   - Responsive design works

## 🔒 Step 5: Security & Production Hardening

### 5.1 Update JWT Secret

Generate a strong JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Update this in Railway environment variables.

### 5.2 Configure CORS

Ensure your API CORS settings include your production domain:

```javascript
const allowedOrigins = [
  'https://your-netlify-site.netlify.app',
  'https://your-custom-domain.com',
  // ... other origins
];
```

### 5.3 Enable HTTPS

Both Netlify and Railway provide HTTPS by default.

## 📊 Step 6: Monitoring & Maintenance

### 6.1 Railway Monitoring

- Monitor API health in Railway dashboard
- Set up alerts for downtime
- Monitor resource usage

### 6.2 Netlify Analytics

- Enable Netlify Analytics (paid feature)
- Monitor site performance
- Track visitor metrics

### 6.3 Database Monitoring

- Monitor MongoDB Atlas dashboard
- Set up database alerts
- Regular backup verification

## 🚨 Troubleshooting

### API Not Responding

1. Check Railway logs for errors
2. Verify environment variables
3. Test database connection
4. Check CORS configuration

### Website Not Loading

1. Check Netlify build logs
2. Verify static files are in `public/` directory
3. Check redirect rules in `netlify.toml`

### Portal Login Issues

1. Verify API URL in environment variables
2. Check CORS settings
3. Test API endpoints directly
4. Verify JWT secret consistency

## 📞 Support

For deployment issues:
- **Railway Support:** [docs.railway.app](https://docs.railway.app)
- **Netlify Support:** [docs.netlify.com](https://docs.netlify.com)
- **NHD Support:** hello@northheaddigital.com

## 🎉 Success!

Once deployed, your North Head Digital ecosystem will be live at:
- **Website:** `https://your-site.netlify.app`
- **API:** `https://your-api.up.railway.app`
- **Client Portal:** `https://your-site.netlify.app/portal/app/`

---

**North Head Digital** - Transforming complex AI technology into simple, powerful business solutions.
