# NHD Website

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Professional marketing website for North Head Digital featuring AI services, client portal integration, and modern responsive design.

## 🌟 Features

- **🎨 Modern Design** - Clean, professional aesthetic with NHD branding
- **📱 Fully Responsive** - Optimized for all devices and screen sizes
- **⚡ Fast Performance** - Static site with optimized assets
- **🔗 Client Portal Integration** - Seamless access to client portal
- **📧 Newsletter Signup** - Email subscription functionality
- **📞 Contact Forms** - Interactive contact and consultation forms
- **🎯 Service Pages** - Detailed pages for AI services
- **🔍 SEO Optimized** - Search engine friendly structure

## 📋 Services Showcased

### 🤖 AI Intelligence
- Custom AI solutions
- Machine learning integration
- Intelligent automation

### 📊 Analytics & Insights
- Data analysis and visualization
- Predictive analytics
- Business intelligence

### ⚡ Process Automation
- Workflow optimization
- Task automation
- Efficiency improvements

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ (for development server)
- **Web browser** (for static hosting)

### 1. Clone the Repository

```bash
git clone https://github.com/North-Head-Digital/nhd-website.git
cd nhd-website
```

### 2. Development Server

```bash
# Install dependencies (optional, for development server)
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3001` to view the website.

### 3. Static Hosting

The website is a static site and can be hosted on any web server:

```bash
# Simply serve the public/ directory
# Examples:
python -m http.server 8000  # Python
npx serve public/           # Node.js
# Or upload public/ contents to any web hosting service
```

## 📁 Project Structure

```
nhd-website/
├── public/                 # Static website files
│   ├── index.html         # Homepage
│   ├── intelligence.html  # AI Intelligence service page
│   ├── analytics.html     # Analytics service page
│   ├── automation.html    # Automation service page
│   ├── portal.html        # Client portal landing page
│   ├── portal/            # Client portal app (built from nhd-client-portal)
│   │   └── app/
│   ├── css/               # Stylesheets
│   │   ├── styles.css     # Main stylesheet
│   │   ├── components.css # Component styles
│   │   ├── responsive.css # Responsive design
│   │   └── animations.css # CSS animations
│   ├── js/                # JavaScript files
│   │   └── main.js        # Main JavaScript functionality
│   └── favicon.ico        # Site favicon
├── docs/                  # Documentation
│   ├── north_head_design_doc.md  # Brand design system
│   └── nhd-logo-assets.html      # Logo assets and usage
├── dev-server.js          # Development server script
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## 🎨 Design System

### Brand Colors

```css
:root {
  --primary: #667eea;        /* Main brand color */
  --secondary: #764ba2;      /* Secondary color */
  --accent: #f64f59;         /* Accent color */
  --dark: #1a202c;           /* Dark text */
  --light: #f7fafc;          /* Light background */
}
```

### Typography

- **Primary Font:** Inter (Google Fonts)
- **Fallback:** system-ui, sans-serif
- **Weights:** 400, 500, 600, 700, 800, 900

### Components

- **Navigation** - Responsive header with mobile menu
- **Hero Sections** - Engaging landing sections
- **Service Cards** - Feature showcase components
- **Contact Forms** - Interactive form elements
- **Footer** - Comprehensive site footer with links

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
@media (min-width: 640px)  { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1280px) { /* Large Desktop */ }
```

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server on port 3001
npm run build    # Build client portal and copy to public/
npm run clean    # Clean temporary files
```

### Development Server

The development server (`dev-server.js`) provides:
- Static file serving
- Live reload capabilities
- CORS headers for local development
- Port 3001 (to avoid conflicts with client portal)

### Client Portal Integration

The website integrates with the client portal:

1. **Portal Landing Page** (`/portal.html`) - Login/registration interface
2. **Portal App** (`/portal/app/`) - Built React application
3. **Seamless Navigation** - Links between website and portal

## 📄 Page Structure

### Homepage (`index.html`)
- Hero section with value proposition
- Services overview
- Test, Learn, Scale methodology
- Industry showcase
- Contact form
- Newsletter signup

### Service Pages
- **Intelligence** (`intelligence.html`) - AI solutions and capabilities
- **Analytics** (`analytics.html`) - Data insights and analytics
- **Automation** (`automation.html`) - Process automation services

### Portal Landing (`portal.html`)
- Client login interface
- Registration form
- Environment-aware API configuration

## 🚀 Deployment

### Static Hosting

The website is designed for static hosting platforms:

- **Netlify** - Recommended (includes `netlify.toml` configuration)
- **Vercel** - Excellent performance
- **GitHub Pages** - Free hosting
- **AWS S3 + CloudFront** - Enterprise solution
- **Any web server** - Traditional hosting

### Netlify Deployment

```toml
# netlify.toml
[build]
  publish = "public"
  command = "npm run build"

[[redirects]]
  from = "/portal"
  to = "/portal.html"
  status = 200

[[redirects]]
  from = "/portal/*"
  to = "/portal/app/:splat"
  status = 200
```

### Environment Configuration

The portal integration automatically detects the environment:

```javascript
// Environment-aware API configuration
const API_BASE_URL = window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000'
    : 'https://api.northheaddigital.com';
```

## 🔍 SEO & Performance

### SEO Features

- **Semantic HTML5** - Proper document structure
- **Meta Tags** - Title, description, and Open Graph tags
- **Structured Data** - Schema.org markup
- **Sitemap** - XML sitemap for search engines
- **Robots.txt** - Search engine crawling instructions

### Performance Optimizations

- **Minified CSS/JS** - Reduced file sizes
- **Optimized Images** - Compressed and properly sized
- **Preconnect Links** - Faster font loading
- **Critical CSS** - Above-the-fold optimization
- **Lazy Loading** - Deferred image loading

## 🧪 Testing

### Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Device Testing

- ✅ Desktop (1920x1080, 1440x900, 1366x768)
- ✅ Tablet (768x1024, 1024x768)
- ✅ Mobile (375x667, 414x896, 360x640)

### Manual Testing Checklist

- [ ] All pages load correctly
- [ ] Navigation works on all devices
- [ ] Contact forms submit properly
- [ ] Newsletter signup functions
- [ ] Client portal integration works
- [ ] All links are functional
- [ ] Images load properly
- [ ] Responsive design works

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Content Guidelines

- Maintain professional tone and messaging
- Ensure all content aligns with NHD brand
- Test all interactive elements
- Verify responsive design on multiple devices
- Check for accessibility compliance

## 📞 Support

For support, email hello@northheaddigital.com or visit our [website](https://northheaddigital.com).

## 🔗 Related Repositories

- [NHD API](https://github.com/North-Head-Digital/nhd-api) - Backend API server
- [NHD Client Portal](https://github.com/North-Head-Digital/nhd-client-portal) - React client portal

---

**North Head Digital** - Transforming complex AI technology into simple, powerful business solutions.