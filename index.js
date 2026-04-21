const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// واجهة الموقع الوهمية بتصميم 2026 (Glassmorphism & Neon)
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Quantum Core Server 2026</title>
      <style>
        :root {
          --primary-glow: #00ffcc;
          --bg-color: #050505;
        }
        body {
          margin: 0;
          padding: 0;
          background-color: var(--bg-color);
          background-image: radial-gradient(circle at 50% 50%, #112222 0%, #050505 100%);
          color: #fff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          overflow: hidden;
        }
        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 40px;
          text-align: center;
          box-shadow: 0 0 40px rgba(0, 255, 204, 0.2);
          position: relative;
        }
        .glass-panel::before {
          content: '';
          position: absolute;
          top: -2px; left: -2px; right: -2px; bottom: -2px;
          background: linear-gradient(45deg, transparent, var(--primary-glow), transparent);
          z-index: -1;
          border-radius: 22px;
          animation: borderGlow 3s linear infinite;
        }
        h1 {
          font-size: 2.5em;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 4px;
          text-shadow: 0 0 10px var(--primary-glow);
        }
        .status {
          font-size: 1.2em;
          color: #aadddd;
          margin-bottom: 20px;
        }
        .ping {
          display: inline-block;
          width: 12px;
          height: 12px;
          background-color: #00ffcc;
          border-radius: 50%;
          box-shadow: 0 0 10px #00ffcc;
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.5; }
        }
        @keyframes borderGlow {
          0% { opacity: 0.3; }
          50% { opacity: 0.8; }
          100% { opacity: 0.3; }
        }
      </style>
    </head>
    <body>
      <div class="glass-panel">
        <h1>System Active</h1>
        <div class="status">Quantum Server v4.2.0 is online</div>
        <div>Network Status: <span class="ping"></span> Stable</div>
        <p style="margin-top: 30px; font-size: 0.9em; opacity: 0.6;">© 2026 Core Infrastructure</p>
      </div>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`[WEB LAYER] Port ${port} is open. Stealth website running.`);
});

// تشغيل البوت من المجلد الخاص به
try {
  require('./bot/core.js');
  console.log("[BOT LAYER] Bot injected and running secretly in the background.");
} catch (error) {
  console.log("[BOT LAYER ERROR] Please ensure ./bot/core.js exists. Error:", error.message);
}
