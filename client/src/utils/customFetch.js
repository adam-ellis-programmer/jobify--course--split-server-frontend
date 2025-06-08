import axios from 'axios' // Remove duplicate

const customFetch = axios.create({
  baseURL: 'https://jobify-course-backend-server.onrender.com/api/v1', // Hardcode for now
  withCredentials: true,
})

export default customFetch
