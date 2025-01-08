import axios from 'axios';

export async function getPublicIP() {
  const response = await axios.get('https://api.ipify.org?format=json');
  return response.data.ip;
}

export async function getPublicIPInfo(ip) {
  const response = await axios.get(`https://ipinfo.io/${ip}/json`);
  return response.data;
}
