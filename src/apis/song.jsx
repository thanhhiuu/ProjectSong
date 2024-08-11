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
