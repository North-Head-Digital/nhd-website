# North Head Digital Website

A modern, responsive website for North Head Digital - a family-owned AI solutions company.

## 🚀 Quick Deploy to Netlify

### Option 1: Using Netlify CLI (Recommended)

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Run the deployment script:
   ```bash
   ./deploy-to-netlify.sh
   ```

### Option 2: Manual Netlify Deployment

1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login to your account
3. Click "Add new site" → "Import an existing project"
4. Choose "Deploy manually"
5. Drag and drop the `public` folder
6. Your site will be live immediately!

### Option 3: Git-based Deployment

1. Push this repository to GitHub
2. Connect your GitHub repo to Netlify
3. Set build settings:
   - **Build command**: `echo 'Static site - no build required'`
   - **Publish directory**: `public`
4. Deploy!

## 📁 Project Structure

```
NHD-Website/
├── public/
│   ├── index.html          # Main website file (updated with authentic content)
│   └── index-backup-*.html # Backup files
├── docs/                   # Business documentation
├── netlify.toml           # Netlify configuration
├── deploy-to-netlify.sh   # Deployment script
└── README.md              # This file
```

## ✨ What's Updated

- ✅ **Authentic Story**: Replaced fake statistics with honest positioning
- ✅ **Conservative Pricing**: Added transparent 3-tier pricing structure
- ✅ **Test, Learn, Scale**: Included methodology section
- ✅ **Family-Owned**: Updated messaging to reflect family business values
- ✅ **Industries Focus**: Added industry expertise section
- ✅ **Contact Info**: Updated with authentic contact details

## 🔧 Local Development

To test locally:

```bash
# Start local server
python3 -m http.server 8000 --directory public

# Open in browser
open http://localhost:8000
```

## 📞 Support

For questions about deployment or updates, contact:
- Email: contact@northheaddigital.com
- Website: [Your Netlify URL will be here]

---

**North Head Digital** - Turning AI complexity into business simplicity, one solution at a time.
