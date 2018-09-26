import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `http://imd.utdallas.edu:8081`
  })
}
