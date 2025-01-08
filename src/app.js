import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPublicIP, getPublicIPInfo } from './services/ipService.js';
import { checkWebsiteAvailability } from './services/websiteService.js';
import { checkDnsLeak } from './services/dnsLeakService.js';
import { getIPInfo, queryIPInfo } from './controllers/ipController.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', getIPInfo);

app.get('/query', queryIPInfo);

app.get('/dns-leak', async (req, res) => {
  const dnsLeakInfo = await checkDnsLeak();
  res.render('dnsLeak', { dnsLeakInfo });
});

app.get('/availability', async (req, res) => {
  const sites = ['https://www.google.com', 'https://github.com', 'https://www.youtube.com', 'https://www.163.com', 'https://www.baidu.com'];
  const results = {};
  for (const site of sites) {
    results[site] = await checkWebsiteAvailability(site);
  }
  res.render('availability', { results });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
