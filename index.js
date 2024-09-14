const express = require('express');
const path = require('path');
const app = express();

// Serve static files from 'public' directory
app.use('/images', express.static(path.join(__dirname, 'public/product/images')));

// Example route
app.get('/', (req, res) => {
  res.send('Product images are hosted locally.');
});

// Start the server
const PORT = 3100;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});