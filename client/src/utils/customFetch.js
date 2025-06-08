import axios from 'axios'
import axios from 'axios'

const customFetch = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://jobify-course-backend-server.onrender.com/api/v1'
      : '/api/v1',
  withCredentials: true, // ADD THIS LINE
})

export default customFetch
