const http = require('http');
const crypto = require('crypto');
const { exec } = require('child_process');

const PORT = 9000;
const SECRET = process.env.WEBHOOK_SECRET || 'your-webhook-secret-here';

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/webhook') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      // Verify GitHub signature
      const signature = req.headers['x-hub-signature-256'];
      if (signature) {
        const hmac = crypto.createHmac('sha256', SECRET);
        const digest = 'sha256=' + hmac.update(body).digest('hex');

        if (signature !== digest) {
          console.log('Invalid signature');
          res.writeHead(401);
          res.end('Invalid signature');
          return;
        }
      }

      console.log('Webhook received, rebuilding...');
      res.writeHead(200);
      res.end('OK');

      // Run rebuild script
      exec('/var/www/quebec-iptv.ca/webhook/rebuild.sh', (error, stdout, stderr) => {
        if (error) {
          console.error('Rebuild error:', error);
          return;
        }
        console.log('Rebuild output:', stdout);
        if (stderr) console.error('Rebuild stderr:', stderr);
      });
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`Webhook server running on port ${PORT}`);
});
