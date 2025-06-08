import axios from 'axios'
const customFetch = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://jobify-course-backend-server.onrender.com/api/v1' // Your Render URL
      : '/api/v1', // Keep proxy for local development
})

export default customFetch
