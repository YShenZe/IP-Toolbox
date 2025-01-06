import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPublicIP, getPublicIPInfo } from './services/ipService.js';
import { checkWebsiteAvailability } from './services/websiteService.js';
import { checkDnsLeak } from './services/dnsLeakService.js';
import { getIPInfo, queryIPInfo } from './controllers/ipController.js';

const app = express();

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 设置视图引擎为 EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // 使用解析后的路径

// 静态文件托管
app.use(express.static(path.join(__dirname, '../public')));

// 首页显示 IP 信息
app.get('/', getIPInfo);

// 查询任意 IP 信息
app.get('/query', queryIPInfo);

// DNS 泄漏检测
app.get('/dns-leak', async (req, res) => {
  const dnsLeakInfo = await checkDnsLeak();
  res.render('dnsLeak', { dnsLeakInfo });
});

// 网站可用性检查
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
