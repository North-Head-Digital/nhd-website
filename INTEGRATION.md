# North Head Digital - Website & Portal Integration

This document explains how the main website and client portal are integrated together.

## 🏗️ Architecture Overview

The integration consists of three main components:

1. **Main Website** (`/`) - Static HTML website with marketing content
2. **Portal Landing** (`/portal`) - Landing page for client portal access
3. **Client Portal** (`/portal/app/`) - React-based client portal application

## 🔗 Navigation Flow

```
Main Website (/) 
    ↓ [Client Portal Link]
Portal Landing (/portal)
    ↓ [Enter Portal Button]
Client Portal (/portal/app/)
    ↓ [Back to Website Link]
Main Website (/)
```

## 🔐 Authentication System

### Shared Authentication
Both the main website and client portal use a shared authentication system:

- **Token Storage**: `nhd_auth_token` in localStorage
- **User Data**: `nhd_user_data` in localStorage
- **Cross-tab Communication**: Storage events for real-time updates

### Authentication
Users must register for an account to access the portal. Admin users can manage all accounts through the admin dashboard.

## 📁 File Structure

```
NHD-Website/
├── public/
│   ├── index.html              # Main website
│   ├── portal.html             # Portal landing page
│   ├── portal/app/             # React app build output
│   │   ├── index.html
│   │   └── assets/
│   ├── js/
│   │   ├── auth.js             # Shared authentication
│   │   └── main.js             # Website functionality
│   └── css/                    # Website styles
├── netlify.toml                # Deployment configuration
└── test-integration.html       # Integration testing

NHD-Client_Portal/
├── src/                        # React source code
├── dist/                       # Build output (copied to website)
└── package.json
```

## 🚀 Deployment Configuration

### Netlify Configuration (`netlify.toml`)

```toml
# Handle portal routes
[[redirects]]
  from = "/portal"
  to = "/portal.html"
  status = 200

# Handle portal app routes (for React app)
[[redirects]]
  from = "/portal/app/*"
  to = "/portal/app/index.html"
  status = 200

# Default redirect for other routes
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 🔄 Build Process

1. **Build React App**:
   ```bash
   cd NHD-Client_Portal
   npm run build
   ```

2. **Copy Build Output**:
   ```bash
   cp -r NHD-Client_Portal/dist/* NHD-Website/public/portal/app/
   ```

3. **Deploy Website**:
   ```bash
   # Deploy to Netlify or your hosting platform
   ```

## 🧪 Testing Integration

1. **Visit Test Page**: `/test-integration.html`
2. **Test Navigation**: Click through all links
3. **Test Authentication**: Use demo credentials
4. **Test Cross-site Communication**: Login in portal, check main site

## 🎨 Styling Integration

### Main Website
- Uses custom CSS with gradient themes
- Portal link styled with special button treatment
- Responsive design for all devices

### Client Portal
- React app with Tailwind CSS
- Consistent branding with main website
- Professional dashboard interface

## 🔧 Development Workflow

### Making Changes

1. **Website Changes**: Edit files in `NHD-Website/public/`
2. **Portal Changes**: 
   - Edit React components in `NHD-Client_Portal/src/`
   - Run `npm run build`
   - Copy build output to website

### Authentication Updates

- Update `auth.js` for shared authentication logic
- Update `AuthContext.tsx` in React app for consistency
- Test cross-site authentication flow

## 🚨 Important Notes

1. **Build Process**: Always rebuild and copy React app after changes
2. **Authentication**: Both sites must use same localStorage keys
3. **Routing**: Netlify redirects handle SPA routing for React app
4. **Testing**: Use `/test-integration.html` to verify integration

## 🔍 Troubleshooting

### Common Issues

1. **Portal Not Loading**: Check if React app is built and copied
2. **Authentication Not Working**: Verify localStorage keys match
3. **Navigation Issues**: Check Netlify redirect configuration
4. **Styling Problems**: Ensure CSS files are properly linked

### Debug Tools

- Browser DevTools → Application → Local Storage
- Network tab for redirect issues
- Console for JavaScript errors

## 📈 Future Enhancements

1. **Real Authentication**: Replace demo system with real API
2. **User Management**: Add user registration and profile management
3. **Analytics**: Track usage across both sites
4. **Performance**: Optimize loading and caching
5. **Security**: Add CSRF protection and secure headers

---

**Last Updated**: January 2025  
**Version**: 1.0.0
