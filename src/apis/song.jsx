import axios from '../axios';

export const getSongID = (sid) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: '/song',
        method: 'get',
        params: { id: sid },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const getSongInfo = (sid) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: '/infosong',
        method: 'get',
        params: { id: sid },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const getdetailPlaylist = (sid) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: '/detailplaylist',
        method: 'get',
        params: { id: sid },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const search = (keyword) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `/search`,
        method: 'get',
        params: { keyword: keyword },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const searchSong = (pid) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `/artistsong`,
        method: 'get',
        params: { id: pid, page: 1, count: 100 },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const searchPlaylist = (name) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `/artist`,
        method: 'get',
        params: { name: name },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
