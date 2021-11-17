import axios from 'axios'

export async function get (resource) {
  const json = await axios.get(`/api/${resource}`)
  return json
}

export function response (payload, isError = false) {
  const response = {}
  if (isError) {
    response.error = payload
  } else {
    response.data = payload
  }
  return response
}
