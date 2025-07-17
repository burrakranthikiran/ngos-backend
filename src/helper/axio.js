import axios from 'axios';
import qs from 'qs';

export const postJson = async (url, data, headerAddons = {}) => {
  return await axios({
    method: `post`,
    url,
    headers: {
      'Content-Type': `application/json`,
      ...headerAddons,
    },
    data,
  })
    .then(function (response) {
      // console.log(`response.data?`, response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(`error?`, error);
      throw error;
    });
};
export const postXml = async (url, data, headerAddons = {}) => {
  return await axios({
    method: `post`,
    url,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded',
      ...headerAddons,
    },
    data: qs.stringify(data),
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      // console.log(`error?`, error.toJSON());
      throw error;
    });
};
export const getXml = async (url, headerAddons = {}) => {
  return await axios({
    method: `get`,
    url,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded',
      ...headerAddons,
    },
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(`error?`, error.toJSON());
      throw error;
    });
};
export const postForm = async (url, form, headerAddons = {}) => {
  return await axios({
    method: `post`,
    url,
    headers: {
      // 'Content-Type': `application/json`,
      ...form.getHeaders(),
      ...headerAddons,
    },
    data: form,
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(`error?`, error);
      throw error;
    });
};

export const getJson = async (url, headerAddons = {}, params) => {
  return await axios({
    method: `get`,
    url,
    headers: {
      'Content-Type': `application/json`,
      ...headerAddons,
    },
    params,
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw error;
    });
};
