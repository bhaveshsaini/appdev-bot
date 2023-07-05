import axios from 'axios';
import { API_TOKEN } from './apiKey.js'; 

// Helper function to pad single digits with a leading zero
function padZero(value) {
    return value.toString().padStart(2, '0');
  }

//to get current time in UTC
function getCurrentUTCTime() {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = now.getUTCMonth() + 1; // Months are zero-based, so add 1
    const day = now.getUTCDate();
    const hours = now.getUTCHours();
    const minutes = now.getUTCMinutes();
    const seconds = now.getUTCSeconds();

    return {
        since: `${year}-${padZero(month)}-${padZero(day)}T${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}Z`,
        until: `${year}-${padZero(month)}-${padZero(day)}T${padZero(hours)}:${padZero(minutes)}:${padZero(seconds + 1)}Z`
    }
}

const BASE_URL = 'https://api.pagerduty.com'
const SCHEDULE_ID = 'PVVGQKH'
const SINCE_TIMESTAMP = getCurrentUTCTime().since; // Specify the start of the time range
const UNTIL_TIMESTAMP = getCurrentUTCTime().until; // Specify the end of the time range


const response = await axios.get(`${BASE_URL}/schedules/${SCHEDULE_ID}/users`, {
headers: {
    Authorization: `Token token=${API_TOKEN}`,
    Accept: 'application/vnd.pagerduty+json;version=2',
},
params: {
    since: SINCE_TIMESTAMP,
    until: UNTIL_TIMESTAMP,
},
});

console.log(response.data.users[0].name);