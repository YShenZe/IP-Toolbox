// services/websiteService.js
import axios from 'axios';

export async function checkWebsiteAvailability(url) {
  try {
    await axios.get(url);
    return true;
  } catch (error) {
    return false;
  }
}
