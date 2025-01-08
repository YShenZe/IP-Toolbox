import axios from 'axios';

export async function checkDnsLeak() {
  const response = await axios.get('https://api.dnslq.com');
  return response.data;
}
