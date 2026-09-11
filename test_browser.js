const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'frontend/dist')));

const server = app.listen(3000, async () => {
  console.log('Server running on port 3000');
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
    page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));
    
    await page.goto('http://localhost:3000');
    await new Promise(r => setTimeout(r, 2000)); // wait for react to mount
    
    await browser.close();
    server.close();
  } catch(e) {
    console.error(e);
    server.close();
  }
});
