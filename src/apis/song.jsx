import instance from '../axios';

export const getSongID = (sid) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    try {
      const response = await instance({
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
      const response = await instance({
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
      const response = await instance({
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
      const response = await instance({
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
      const response = await instance({
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
      const response = await instance({
        url: `/artist`,
        method: 'get',
        params: { name: name },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
