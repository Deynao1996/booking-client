import axios from 'axios'
import swal from 'sweetalert'

const client = axios.create({
  // baseURL: 'http://localhost:8800/api',
  // headers: { 'Access-Control-Allow-Credentials': true }
})

export const request = ({ ...options }) => {
  const onSuccess = (response) => response
  const onError = (error) => {
    const {
      message,
      response: { data }
    } = error
    if (data.errorMessage) {
      swal('Error', data.errorMessage, 'error')
    } else {
      swal('Error', message, 'error')
    }
    return error
  }
  return client(options).then(onSuccess).catch(onError)
}
