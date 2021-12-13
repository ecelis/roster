import axios from 'axios'

const _api = '/api/'

export async function get (resource, query) {
  let queryString = ''
  if (query) {
    // TODO make it dynamic
    queryString = `?email=${query.email}&tId=${query.tId}`
  }
  const json = await axios.get(_api + resource + queryString)
  return json
}

export async function post (resource, payload) {
  const json = await axios.post(_api + resource, payload)
  return json
}

export function response (payload, isError = false) {
  const response = {}
  if (isError) {
    response.success = false
    response.error = payload
  } else {
    response.success = true
    response.data = payload
  }
  return response
}
