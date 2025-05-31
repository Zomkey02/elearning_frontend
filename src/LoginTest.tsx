import { useEffect } from 'react'
import axios from './api/axios'

export default function LoginTest() {
  useEffect(() => {
    axios.get('/sanctum/csrf-cookie')
      .then(() => {
        console.log('CSRF cookie set')
      })
      .catch((error) => {
        console.error('Failed to get CSRF cookie:', error)
      })
  }, [])

  return <div>Testing CSRF Cookie...</div>
}
