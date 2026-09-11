const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Fallback for SPA in express 5 / path-to-regexp 8
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.includes('.')) {
    res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
  } else {
    next();
  }
});

const routes = [
  '/',
  '/sites',
  '/analytics',
  '/insights',
  '/alerts',
  '/intelligence',
  '/worker',
  '/community',
  '/learning',
  '/reports',
  '/manual',
  '/settings',
  '/unknown-route-test'
];

const server = app.listen(3001, async () => {
  console.log('QA Test Server running on port 3001');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const consoleLogs = [];
  const pageErrors = [];
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleLogs.push({ type: 'error', text: msg.text(), location: msg.location() });
    }
  });
  
  page.on('pageerror', error => {
    pageErrors.push(error.message);
  });

  for (const r of routes) {
    console.log(`Testing route: ${r}`);
    await page.goto(`http://localhost:3001${r}`, { waitUntil: 'networkidle0' });
    await new Promise(res => setTimeout(res, 300));
  }

  console.log('\n=== PAGE ERRORS ===');
  console.log(JSON.stringify(pageErrors, null, 2));

  console.log('\n=== CONSOLE ERRORS ===');
  console.log(JSON.stringify(consoleLogs, null, 2));

  await browser.close();
  server.close();
});
