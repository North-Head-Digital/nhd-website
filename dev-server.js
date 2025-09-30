const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// Set correct MIME types for JavaScript modules
app.use((req, res, next) => {
  if (req.url.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript');
  }
  next();
});

// Serve static files from public directory FIRST
app.use(express.static('public'));

// Handle portal routes (with and without trailing slash)
app.get('/portal', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'portal.html'));
});

app.get('/portal/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'portal.html'));
});

// Handle portal app static assets (CSS, JS, etc.)
app.use('/portal/app', express.static(path.join(__dirname, 'public', 'portal', 'app')));

// Handle portal app routes (React SPA) - this must be last for the portal app
app.get('/portal/app/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'portal', 'app', 'index.html'));
});

// Handle all other routes - serve main website (this must be LAST)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Development server running at http://localhost:${PORT}`);
    console.log(`📱 Main website: http://localhost:${PORT}`);
    console.log(`🔗 Portal landing: http://localhost:${PORT}/portal`);
    console.log(`⚡ Client portal: http://localhost:${PORT}/portal/app/`);
});