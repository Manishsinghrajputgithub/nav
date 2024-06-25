// cors-proxy.js
const cors_proxy = require('cors-anywhere');

const PORT = 8080; // You can use any port number you like
cors_proxy.createServer({
  originWhitelist: [], // Allow all origins
  requireHeaders: [], // Do not require any headers
  removeHeaders: ['cookie', 'cookie2'] // Remove cookies
}).listen(PORT, () => {
  console.log(`CORS Anywhere proxy server is running on port ${PORT}`);
});
