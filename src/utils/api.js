import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://auction-api.test',
});