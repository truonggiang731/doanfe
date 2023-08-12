import axios from "axios";
import {store} from "store";
import {APISchema} from "./APISchema";
import config from "config";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: config.api_base_url,
  headers: {
    'Content-type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`[API] ${config.url}`);
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(`[API] ${error.config?.method} ${error.config?.url} [Error]`);

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`[API] ${response.config.method} ${response.config.url} [${response.status}]`);

    return Promise.resolve(response);
  },
  async (error) => {
    console.log(`[API] ${error.config?.method} ${error.config?.url} [${error.response?.status}]`);
    if (error.response && error.response.status === 401) {
      store.dispatch({type: '@auth/LOGOUT'});

    }

    return Promise.reject(error);
  }
);

async function _get(url, config) {
  const response = await axiosInstance.get(url, config);
  return response.data;
}

async function _post(url, data, config) {
  const response = await axiosInstance.post(url, data, config);
  return response.data;
}

async function _put(url, data, config) {
  const response = await axiosInstance.put(url, data, config);
  return response.data;
}

async function _delete(url, config) {
  const response = await axiosInstance.delete(url, config);
  return response.data;
}

export async function apiCall(key, data, config) {
  const apiSchema = APISchema[key];

  if (!apiSchema) {
    throw new Error(`API key ${key} not found`);
  }

  const {method, endpoint} = apiSchema;

  switch (method) {
    case 'GET':
      return _get(endpoint, config);
    case 'POST':
      return _post(endpoint, data, config);
    case 'PUT':
      return _put(`${endpoint}${data.id ? `/${data.id}` : ''}`, data, config);
    case 'DELETE':
      return _delete(`${endpoint}${data.id ? `/${data.id}` : ''}`, config);
    default:
      return _get(endpoint, config);
  }
}
