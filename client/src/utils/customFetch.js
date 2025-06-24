import axios from 'axios'

// const customFetch = axios.create({
//   baseURL:
//     process.env.NODE_ENV === 'production'
//       ? 'https://jobify-course-backend-server.onrender.com/api/v1'
//       : '/api/v1', // Uses Vite proxy for local development
//   withCredentials: true,
// })
const customFetch = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://jobify-course-split-server-frontend-production.up.railway.app/api/v1'
      : '/api/v1', // Uses Vite proxy for local development
  withCredentials: true,
})

export default customFetch
