import { getPublicIP, getPublicIPInfo } from '../services/ipService.js';

export async function getIPInfo(req, res) {
  const ip = await getPublicIP();
  const ipInfo = await getPublicIPInfo(ip);
  res.render('home', { ip, ipInfo });
}

export async function queryIPInfo(req, res) {
  const { ip } = req.query;
  const ipInfo = await getPublicIPInfo(ip);
  res.render('ipQuery', { ip, ipInfo });
}
