const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

let visitorCount = 0;
const appStartTime = new Date();

app.get('/', (req, res) => {
  visitorCount++;
  const clientIP = req.ip || req.connection.remoteAddress;
  
  res.send(`
    <html>
      <head>
        <title>Visitor Counter</title>
        <style>
          body { 
            font-family: 'Arial', sans-serif; 
            text-align: center; 
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .container {
            background: rgba(255,255,255,0.1);
            padding: 40px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          }
          h1 { font-size: 2.5em; margin-bottom: 20px; }
          .count { 
            font-size: 4em; 
            color: #ffeb3b; 
            font-weight: bold;
            margin: 20px 0;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          }
          .info { 
            margin-top: 20px; 
            font-size: 0.9em;
            opacity: 0.8;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🚀 Visitor Counter</h1>
          <div class="count">${visitorCount}</div>
          <p>Visitors and counting!</p>
          <div class="info">
            <p>Host: ${process.env.HOSTNAME || 'local'}</p>
            <p>IP: ${clientIP}</p>
            <p>Uptime: ${Math.floor((new Date() - appStartTime) / 1000)} seconds</p>
            <p>Environment: ${process.env.NODE_ENV || 'development'}</p>
          </div>
        </div>
      </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    visitorCount: visitorCount,
    uptime: Math.floor((new Date() - appStartTime) / 1000),
    timestamp: new Date().toISOString()
  });
});

app.get('/metrics', (req, res) => {
  res.json({
    visitorCount: visitorCount,
    uptime: Math.floor((new Date() - appStartTime) / 1000),
    memoryUsage: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Visitor counter app running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});