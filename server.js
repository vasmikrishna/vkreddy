const express = require('express');
const path = require('path');
const app = express();

// Serve static assets (CSS, JS, images) from the root directory
app.use(express.static(__dirname));

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve about.html specifically
app.get('/about.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

// Catch-all route to fallback to index.html for SPA router safety
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Hostinger sets process.env.PORT dynamically for Node.js apps
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`VK Reddy Web Services running on port ${port}`);
});
